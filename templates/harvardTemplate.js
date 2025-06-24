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

  const formatLinks = links.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join(' | ')

  const formatSkills = skills.map(cat => `
    <p><strong>${cat.categoryName}:</strong> ${cat.skills.join(', ')}</p>
  `).join('')

  const formatExp = experience.map(exp => `
    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; font-weight: bold;">
        <span>${exp.position}, ${exp.company}</span>
        <span>${exp.currentlyWorking ? 'Present' : exp.endDate} | ${exp.startDate}</span>
      </div>
      <ul style="margin-top: 6px;">
        ${exp.description.split('\n').map(bullet => `<li>${bullet}</li>`).join('')}
      </ul>
    </div>
  `).join('')

  const formatEdu = education.map(edu => `
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <div><strong>${edu.name}</strong>, ${edu.institution}</div>
      <div>${edu.ongoing ? 'In progress' : edu.year}</div>
    </div>
  `).join('')

  const formatLangs = languages.map(lang => `<p>${lang.language}: ${lang.level}</p>`).join('')

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            padding: 50px 60px;
            line-height: 1.6;
            color: #111;
          }

          h1 {
            font-size: 28px;
            text-align: center;
            margin-bottom: 4px;
          }

          .contact {
            text-align: center;
            font-size: 14px;
            color: #444;
            margin-bottom: 30px;
          }

          h2 {
            font-size: 14px;
            letter-spacing: 1px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #aaa;
            padding-bottom: 4px;
            margin-top: 30px;
            margin-bottom: 12px;
          }

          a {
            color: #007bff;
            text-decoration: none;
          }

          li {
            margin-bottom: 6px;
          }
        </style>
      </head>
      <body>
        <h1>${personal.fullName}</h1>
        <div class="contact">
          ${personal.city}, ${personal.province} | ${personal.email} | ${personal.phone} <br/>
          ${formatLinks}
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
