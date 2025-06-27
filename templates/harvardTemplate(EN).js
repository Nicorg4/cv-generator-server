module.exports = function generateHTML(data) {
  const {
    personal,
    links,
    profile,
    skills,
    experience,
    education,
    languages
  } = data

  function formatDate(value) {
    if (!value) return ''
    const [year, month] = value.split('-')
    const date = new Date(`${year}-${month}-01`)
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date)
  }

  const formatLinks = links.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join(' | ')

  const formatSkills = skills.map(cat => `
    <p style="margin-bottom: 3px;"><strong>${cat.categoryName}:</strong> ${cat.skills.join(', ')}</p>
  `).join('')

  const formatExp = experience.map(exp => `
    <div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 3px;">
        <span><strong>${exp.position},</strong> ${exp.company}</span>
        <span><strong>${formatDate(exp.startDate)} - ${exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}</strong></span>
      </div>
      <ul style="margin-top: 2px; font-size: 13px; padding-left:15px">
        ${exp.description.split('\n').map(bullet => `<li>${bullet}</li>`).join('')}
      </ul>
    </div>
  `).join('')

  const formatEdu = education.map(edu => `
    <div style="display: flex; flex-direction:column; justify-content: space-between; font-size: 13px; margin-bottom: 3px;">
      <div style="display: flex; justify-content: space-between;">
        <strong>${edu.name}</strong> <strong>${edu.ongoing ? edu.startYear + ' - In progress' : (edu.startYear === edu.endYear ? edu.endYear : edu.startYear + ' - ' + edu.endYear)}</strong>
      </div>
      <div>${edu.institution}</div>
    </div>
  `).join('')

    const translatedLangLevels = {
    1 : 'Beginner',
    2 : 'Intermediate',
    3 : 'Advanced',
    4 : 'Native'
  }

  const formatLangs = languages.map(lang => `<p><strong>${lang.language}:</strong> ${translatedLangLevels[lang.level]}</p>`).join('')

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.3;
            color: #111;
          }

          h1 {
            font-size: 30px;
            text-align: center;
            margin-bottom: 3px;
            font-weight: semi-bold;
          }

          .contact {
            text-align: center;
            font-size: 14px;
            color: #444;
          }

          h2 {
            font-size: 15px;
            letter-spacing: 1px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 2px solid black;
            padding-bottom: 1px;
          }

          a {
            color: #007bff;
            text-decoration: none;
          }

          li {
            margin-bottom: 2px;
          }
            p {
              margin: 0 0;
              padding: 0 0;
              font-size: 14px;
            }
        </style>
      </head>
      <body>
        <h1>${personal.fullName}</h1>
        <div class="contact">
          ${personal.city}, ${personal.province} | ${personal.email} | ${personal.phone} | ${formatLinks}
        </div>

        <h2>Summary</h2>
        <p>${profile}</p>

        <h2>Skills</h2>
        ${formatSkills}

        <h2>Experience</h2>
        ${formatExp}

        <h2>Education</h2>
        ${formatEdu}

        <h2>Languages</h2>
        ${formatLangs}
      </body>
    </html>
  `
}
