const baseUrl = window.location.origin
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('bibliographics')
  const records = await axios.get(`${baseUrl}/api.php`)
    .then(({ data }) => Promise.resolve(data))
  records.forEach(record => {
    container.append(bibliographicRecord(record))
  });
})

const bibliographicRecord = (info) => {
  const card = document.createElement('div')
  const labelStyle = 'min-width: 90px; font-weight: bold; font-size: 12pt;'
  const categories = info.TEMAS.split('*')
  const levels = info.NIVELES.split('*')
  const areas = info.AREAS.split('*')
  let htmlCategories = ''
  let htmlLevels = ''
  let htmlAreas = ''
  card.classList = 'card'
  card.style = 'width: 500px;'
  
  categories.forEach((category) => {
    if (category !== '') htmlCategories += `<button class="btn btn-secondary tag">${category}</button>`
  })
  
  levels.forEach((level) => {
    if (level !== '') htmlLevels += `<button class="btn btn-secondary tag">${level}</button>`
  })

  areas.forEach((area) => {
    if (area !== '') htmlAreas += `<button class="btn btn-secondary tag">${area}</button>`
  })

  const content = `
    <div class="card-body">
      <div class="d-flex flex-nowrap" style="font-size: 12pt;"><div style="${labelStyle}">Autor:</div>${info.AUTOR}</div>
      <div class="d-flex flex-nowrap" style="font-size: 12pt;"><div style="${labelStyle}">Título:</div>${info.TITULO}</div>
      <div class="d-flex flex-nowrap" style="font-size: 12pt;"><div style="${labelStyle}">Edición:</div>${info.EDICION}</div>
      <div class="d-flex flex-nowrap" style="font-size: 12pt;"><div style="${labelStyle}">Editorial:</div>${info.EDITORIAL}</div>
      <div class="d-flex flex-nowrap" style="font-size: 12pt;"><div style="${labelStyle}">ISBN/ISSN:</div>${info.ISBN_ISSN}</div>
      <hr class="mb-3">
      <div class="d-flex flex-wrap mb-1 align-items-center">
        <div style="${labelStyle}">Temas:</div>${htmlCategories}
      </div>
      <div class="d-flex flex-wrap mb-1 align-items-center">
        <div style="${labelStyle}">Niveles:</div>${htmlLevels}
      </div>
      <div class="d-flex flex-wrap mb-1 align-items-center">
        <div style="${labelStyle}">Áreas:</div>${htmlAreas}
      </div>
      <div class="d-flex flex-wrap mb-1 align-items-center">
        <div style="${labelStyle}">Formato:</div>${info.FORMATO.toUpperCase()}
      </div>
      <hr>
      <div class="text-end" style="width: 100%;">
        <a href="${info.URL}" class="btn btn-success">Ir al Libro</a>
      </div>
    </div>`
  card.innerHTML = content
  return card
}