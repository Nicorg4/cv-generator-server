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

  const section = (title, content) => `
    <h2>${title}</h2>
    ${content}
  `

  const formatLinks = links.map(link => `<p><a href="${link.url}" target="_blank">${link.name}</a></p>`).join('')
  const formatSkills = skills.map(cat => `
    <h3>${cat.categoryName}</h3>
    <ul>${cat.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
  `).join('')
  const formatExp = experience.map(exp => `
    <div>
      <strong>${exp.position}</strong> at <em>${exp.company}</em> (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})
      <p>${exp.description}</p>
    </div>
  `).join('')
  const formatEdu = education.map(edu => `
    <p><strong>${edu.name}</strong>, ${edu.institution} (${edu.year})</p>
  `).join('')
  const formatLangs = languages.map(lang => `<p>${lang.language} - ${lang.level}</p>`).join('')

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
          h1 { font-size: 2em; margin-bottom: 0; }
          h2 { margin-top: 30px; border-bottom: 1px solid #ccc; }
          a { color: #007bff; text-decoration: none; }
          ul { padding-left: 20px; }
        </style>
      </head>
      <body>
        <h1>${personal.fullName}</h1>
        <p>${personal.city}, ${personal.province} | ${personal.phone} | ${personal.email}</p>

        ${section('Links', formatLinks)}
        ${section('Profile', `<p>${profile}</p>`)}
        ${section('Skills', formatSkills)}
        ${section('Experience', formatExp)}
        ${section('Education', formatEdu)}
        ${section('Languages', formatLangs)}
      </body>
    </html>
  `
}
