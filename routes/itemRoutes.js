const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

// retrives note(s) data
router.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// pushes note(s) data
router.post('/api/notes', (req, res) => {
  const note = req.body
  note.id = uuidv4();
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    const notes = JSON.parse(data)
    notes.push(note)
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

// deletes note(s) data
router.delete('/api/notes/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    const notes = JSON.parse(data)
    for (let i = 0; i < notes.length; i++) {
      const dbElement = notes[i];
      if (dbElement.id === req.params.id) {
        notes.splice(i, 1)
      }
    }
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

module.exports = router