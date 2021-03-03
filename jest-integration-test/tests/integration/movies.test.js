const request = require('supertest')
const { Movie } = require('../../models/movie')
const { User } = require('../../models/user')
const { Genre } = require('../../models/genre')
const mongoose = require('mongoose')

let server
describe('/api/movies', () => {
  beforeEach(() => {
    server = require('../../index')
  })

  afterEach(async () => {
    server.close()
    await Movie.remove({})
    await Genre.remove({})
  })

  describe('GET /', () => {
    it('should return all movies', async () => {
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      await Movie.collection.insertMany([
        {
          title: 'Inception',
          genre: genre,
          numberInStock: 10,
          dailyRentalRate: 5,
        },
        {
          title: 'Interstellar',
          genre: genre,
          numberInStock: 10,
          dailyRentalRate: 5,
        },
      ])

      const res = await request(server).get('/api/movies')
      expect(res.status).toBe(200)
      expect(res.body.some((movie) => movie.title === 'Inception')).toBeTruthy()
      expect(
        res.body.some((movie) => movie.title === 'Interstellar')
      ).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    it('should return a movie if valid id is passed', async () => {
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })
      await movie.save()
      const res = await request(server).get(`/api/movies/${movie._id}`)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('title', movie.title)
    })

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/movies/1')
      expect(res.status).toBe(404)
    })

    it('should return 404 if movie with given id not exists', async () => {
      const id = mongoose.Types.ObjectId()
      const res = await request(server).get(`/api/movies/${id}`)
      expect(res.status).toBe(404)
    })
  })

  describe('POST /', () => {
    it('should return 401 if client is not logged in', async () => {
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const res = await request(server).post('/api/movies').send({
        title: 'inception',
        genreId: genre._id,
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      expect(res.status).toBe(401)
    })

    it('should return 400 if genre with given id does not exist', async () => {
      const token = new User().generateAuthToken()
      const id = mongoose.Types.ObjectId()
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: 'inception',
          genreId: id,
          numberInStock: 10,
          dailyRentalRate: 5,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if title is less than 5 characters', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const title = 'a'
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: title,
          genreId: genre._id,
          numberInStock: 10,
          dailyRentalRate: 5,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if title is more than 50 characters', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const title = new Array(52).join('a')
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: title,
          genreId: genre._id,
          numberInStock: 10,
          dailyRentalRate: 5,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if not valid genreId is passed', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const title = new Array(52).join('a')
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: title,
          genreId: '5',
          numberInStock: 10,
          dailyRentalRate: 5,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if not numberInStock is passed', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const title = new Array(52).join('a')
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: title,
          genreId: genre._id,
          dailyRentalRate: 5,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if not dailyRentalRate is passed', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const title = new Array(52).join('a')
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: title,
          genreId: genre._id,
          numberInStock: 10,
        })

      expect(res.status).toBe(400)
    })

    it('should save the movie if it is valid', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: 'JoJo Rabbit',
          genreId: genre._id,
          numberInStock: 10,
          dailyRentalRate: 5,
        })
      const movie = await Movie.find({ title: 'JoJo Rabbit' })
      expect(movie).not.toBeNull()
    })

    it('should return the movie if it is valid', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: 'JoJo Rabbit',
          genreId: genre._id,
          numberInStock: 10,
          dailyRentalRate: 5,
        })

      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('title', 'JoJo Rabbit')
    })
  })

  describe('PUT /api/movies/:id', () => {
    it('should return 401 if client is not logged in', async () => {
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const movie = new Movie({
        title: 'inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()

      const res = await request(server).put(`/api/movies/${movie._id}`).send({
        title: movie.title,
        genreId: genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      })

      expect(res.status).toBe(401)
    })

    it('should return a 404 error if invalid movie id is passed', async () => {
      const token = new User().generateAuthToken()
      let movie = {}
      const res = await request(server)
        .put(`/api/movies/${1}`)
        .set('x-auth-token', token)
        .send(movie)

      expect(res.status).toBe(404)
    })

    it('should return a 404 error if movie with given id not exist', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const id = mongoose.Types.ObjectId()
      const res = await request(server)
        .put(`/api/movies/${id}`)
        .set('x-auth-token', token)
        .send({
          title: 'titanic',
          genreId: genre._id,
          numberInStock: 10,
          dailyRentalRate: 20,
        })

      expect(res.status).toBe(404)
    })

    it('should return a 400 error if genre with given id not exist', async () => {
      const token = new User().generateAuthToken()
      const id = mongoose.Types.ObjectId()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const movie = new Movie({
        title: 'inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()
      const res = await request(server)
        .put(`/api/movies/${id}`)
        .set('x-auth-token', token)
        .send({
          title: 'titanic',
          genreId: id,
          numberInStock: 10,
          dailyRentalRate: 20,
        })

      expect(res.status).toBe(400)
    })

    it('should return a 400 error if title is less than 5 characters', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()

      const movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()
      const res = await request(server)
        .put(`/api/movies/${movie._id}`)
        .set('x-auth-token', token)
        .send({
          title: 'a',
          genreId: genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
        })

      expect(res.status).toBe(400)
    })

    it('should return a 400 error if title is more than 50 characters', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()

      const movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()
      const res = await request(server)
        .put(`/api/movies/${movie._id}`)
        .set('x-auth-token', token)
        .send({
          title: new Array(52).join('a'),
          genreId: genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if not valid genre Id is passed', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()
      const res = await request(server)
        .put(`/api/movies/${movie._id}`)
        .set('x-auth-token', token)
        .send({
          title: movie.title,
          genreId: '5',
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if not numberInStock is passed', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()
      const res = await request(server)
        .put(`/api/movies/${movie._id}`)
        .set('x-auth-token', token)
        .send({
          title: movie.title,
          genreId: genre._id,
          dailyRentalRate: movie.dailyRentalRate,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if not dailyRentalRate is passed', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      const movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()

      delete movie.dailyRentalRate
      const res = await request(server)
        .put(`/api/movies/${movie._id}`)
        .set('x-auth-token', token)
        .send({
          title: movie.title,
          genreId: genre._id,
          numberInStock: movie.numberInStock,
        })

      expect(res.status).toBe(400)
    })

    it('should update the movie if it is valid', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      let movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()
      const res = await request(server)
        .put(`/api/movies/${movie._id}`)
        .set('x-auth-token', token)
        .send({
          title: 'Life',
          genreId: genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
        })

      movie = await Movie.find({
        title: 'The Martian',
      })

      expect(movie).not.toBeNull()
    })

    it('should return the movie if it is valid', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      let movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()
      const res = await request(server)
        .put(`/api/movies/${movie._id}`)
        .set('x-auth-token', token)
        .send({
          title: 'The Martian',
          genreId: genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
        })

      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('title', 'The Martian')
    })
  })

  describe('DELETE /api/movies/:id', () => {
    it('should return 401 if client is not logged in', async () => {
      const res = await request(server).delete('/api/movies/1')
      expect(res.status).toBe(401)
    })

    it('should return 404 if movie id is not valid ', async () => {
      const token = new User().generateAuthToken()

      const res = await request(server)
        .delete('/api/movies/1')
        .set('x-auth-token', token)

      expect(res.status).toBe(404)
    })

    it("should return 404 if movie with given id doesn't exist", async () => {
      const token = new User().generateAuthToken()
      const id = mongoose.Types.ObjectId()
      const res = await request(server)
        .delete(`/api/movies/${id}`)
        .set('x-auth-token', token)

      expect(res.status).toBe(404)
    })

    it('should return movie if movie id is valid', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save()
      let movie = new Movie({
        title: 'Inception',
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      await movie.save()
      const res = await request(server)
        .delete(`/api/movies/${movie._id}`)
        .set('x-auth-token', token)

      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('title', 'Inception')
    })
  })
})
