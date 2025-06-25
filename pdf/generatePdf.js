const puppeteer = require('puppeteer')
const generateHTMLEN = require('../templates/harvardTemplate(EN)')
const generateHTMLES = require('../templates/harvardTemplate(ES)')

async function generatePdf(data) {
  const html = data.language === 'en'
    ? generateHTMLEN(data)
    : generateHTMLES(data)
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'networkidle0' })
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', bottom: '20px', left: '30px', right: '30px' },
  })

  await browser.close()
  return pdfBuffer
}

module.exports = generatePdf
