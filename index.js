const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const generatePdf = require('./pdf/generatePdf')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json({ limit: '2mb' }))

app.get('/', (req, res) => {
  res.send('CV Generator Backend is running ✅')
})

app.post('/generate', async (req, res) => {
  try {
    const formData = req.body
    const pdfBuffer = await generatePdf(formData)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="cv.pdf"',
    })

    res.send(pdfBuffer)
  } catch (err) {
    console.error('Error generating PDF:', err)
    res.status(500).json({ error: 'Failed to generate PDF' })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Server running`)
})
