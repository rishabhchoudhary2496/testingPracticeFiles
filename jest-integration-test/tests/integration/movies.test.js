const request = require('supertest')
const { Movie } = require('../../models/movie')
const { User } = require('../../models/user')
const { Genre } = require('../../models/genre')

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
        genre: genre,
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
  })

  describe('POST /', () => {
    it('should return 401 if client is not logged in', async () => {
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save
      const res = await request(server).post('/api/movies').send({
        title: 'inception',
        genreId: genre._id,
        numberInStock: 10,
        dailyRentalRate: 5,
      })

      expect(res.status).toBe(401)
    })

    it('should return 400 if title is less than 5 characters', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save
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

    it('should return 400 if title is more than 5 characters', async () => {
      const token = new User().generateAuthToken()
      const genre = new Genre({ name: 'sci-fi' })
      await genre.save
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
      const title = new Array(52).join('a')
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: title,
          genreId: '5',
          dailyRentalRate: 5,
        })

      expect(res.status).toBe(400)
    })

    it('should return 400 if not dailyRentalRate is passed', async () => {
      const token = new User().generateAuthToken()
      const title = new Array(52).join('a')
      const res = await request(server)
        .post('/api/movies')
        .set('x-auth-token', token)
        .send({
          title: title,
          genreId: '5',
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

  //   describe('PUT /api/movies/:id', () => {
  //     it('should return 401 if client is not logged in', async () => {
  //       const genre = new Genre({ name: 'sci-fi' })
  //       await genre.save()
  //       const movie = new Movie({
  //         title: 'inception',
  //         genreId: genre._id,
  //         numberInStock: 10,
  //         dailyRentalRate: 5,
  //       })

  //       await movie.save()

  //       const res = await request(server)
  //         .put(`/api/movies/${movie._id}`)
  //         .send(movie)

  //       except(res.status).toBe(401)
  //     })
  //   })
})
