import { Handler } from '@netlify/functions'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

const resumeData = `
Kush Ise
Contact:
- GitHub: https://github.com/Kush614
- LinkedIn: https://www.linkedin.com/in/kush-ise/

Education:
- University of California Riverside - MS in Computer Science (Sep 2024 – Dec 2025)
- Pimpri Chinchwad College of Engineering - BE in Computer Engineering (Aug 2019 – Jul 2023)

Experience:
- Software Development Engineer at Jio Platforms Limited (Dec 2023 – Jul 2024)
- Developed UI components in React, integrated Jio Pay API
- Led product portal development with Node.js and Express

Skills:
- Languages: Java, Python, C/C++, SQL, JavaScript, HTML/CSS
- Frameworks: React, Node.js, Material-UI, Redux, Spring Boot, Flask

Projects:
1. Shoe Shopping Cart | React.js, JavaScript
 Live Demo: https://kushiseringovertask.netlify.app/

2. Meme Generator | React.js, JavaScript, API integration
 Live Demo: https://kushmemegenerator.netlify.app/

Achievements:
1. Solar Vehicle Challenge: Developed an Advanced Driver Assistance System for 1600km drive
 Details: https://www.linkedin.com/posts/kush-ise_can-team-solarium-drive-1600-km-on-a-single-activity-6788280987332702208-qCB2/

2. Anantha App - National Toy-Hackathon Finalist
 Project Details: https://drive.google.com/file/d/11F7Mp4WLbpwewqSsru6HinF9ccXGdSYZ/view

3. Tree Counting Research
 GitHub: https://github.com/Kush614/Tree-Counting-using-CNN
`

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { prompt } = JSON.parse(event.body || '{}')

  if (!GEMINI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Gemini API key not configured' }) }
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful AI assistant that answers questions about the following resume. Include relevant links when discussing projects or achievements. For projects with live demos, mention that they can be previewed directly in the chat:

                ${resumeData}
                
                Question: ${prompt}`
              }
            ]
          }
        ]
      })
    })

    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify({ response: data.candidates[0].content.parts[0].text })
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error processing your request' })
    }
  }
}

