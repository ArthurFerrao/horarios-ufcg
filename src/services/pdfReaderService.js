import * as PDFJS from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

async function getPageText(pdf, pageNumber) {
  const page = await pdf.getPage(pageNumber)

  const textContent = await page.getTextContent()
  return textContent.items.map((s) => s.str)
}

export default async function getText(file) {
  PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker
  const document = PDFJS.getDocument(file)
  const pdf = await document.promise
  const maxPages = pdf.numPages

  const storePromises = []
  for (let j = 1; j <= maxPages; j += 1) {
    storePromises.push(getPageText(pdf, j))
  }

  return Promise.all(storePromises).then((pages) => {
    let concatList = []
    pages.forEach((text) => {
      concatList = [...concatList, ...text]
    })
    return concatList
  })
}
