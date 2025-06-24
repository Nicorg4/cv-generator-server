const puppeteer = require('puppeteer')
const generateHTML = require('../templates/harvardTemplate')

async function generatePdf(data) {
  const html = generateHTML(data)
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'networkidle0' })
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' },
  })

  await browser.close()
  return pdfBuffer
}

module.exports = generatePdf
