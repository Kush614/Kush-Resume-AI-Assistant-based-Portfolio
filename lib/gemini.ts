const GEMINI_API_KEY = 'AIzaSyA0Nw3zG6N-ttcd3NYokyq-yZV92Yhqvq0'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

const resumeData = `
Kush Ise
Contact:
- Email: kushise27@gmail.com
- LinkedIn: https://www.linkedin.com/in/kush-ise/
- GitHub: https://github.com/Kush614

Education:
- University of California Riverside - MS in Computer Science (Sep 2024 – Dec 2025)
- Pimpri Chinchwad College of Engineering - BE in Computer Engineering (Aug 2019 – Jul 2023)

Experience:
- Software Development Engineer at Jio Platforms Limited (Dec 2023 – Jul 2024)
  * Developed UI components in React for Jio Tira and JioQuest applications
  * Integrated Jio Pay API for secure payment processing
  * Led development of a comprehensive product portal
  * Developed APIs with Node.js and Express
  * Implemented centralized catalog system with MongoDB
  * Integrated Google Maps API for location-based store audits

- Software Development Engineer Intern at Maharashtra Metro Rail Corporation Limited (Jul 2023 – Nov 2023)
  * Developed QR code-based ticketing system
  * Designed RESTful APIs for secure communication
  * Utilized MySQL and MongoDB databases
  * Integrated payment gateways

Projects:
1. Shoe Shopping Cart (React.js, JavaScript)
   Live Demo: https://kushiseringovertask.netlify.app/

2. Meme Generator (React.js, JavaScript, API integration)
   Live Demo: https://kushmemegenerator.netlify.app/

Skills:
- Languages: Java, Python, C/C++, SQL, JavaScript, HTML/CSS
- Frameworks: React, Node.js, Material-UI, Redux, Spring Boot, Flask
- Databases: MySQL, MongoDB, PostgreSQL
- Tools: Git, Kafka, Socket.IO

Achievements:
1. Finalist in India's National Toy-Hackathon Grand Finale
   Project Details: https://drive.google.com/file/d/11F7Mp4WLbpwewqSsru6HinF9ccXGdSYZ/view

2. 1st place RSTE Saur Urja Vehicle Challenge Season 5.0
   Details: https://www.linkedin.com/posts/kush-ise_can-team-solarium-drive-1600-km-on-a-single-activity-6788280987332702208-qCB2/

3. Published paper on Tree Counting and Detection Automation using CNN
   GitHub: https://github.com/Kush614/Tree-Counting-using-CNN
`

export async function generateGeminiResponse(prompt: string) {
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
                text: `You are a helpful AI assistant that answers questions about the following resume. Always include relevant links when discussing contact information, projects, or achievements. If asked about the full resume, provide this link: https://drive.google.com/file/d/1Jc287jVGXussEQ5MWnLds8H4O24i8sIl/view?usp=sharing

                ${resumeData}
                
                Question: ${prompt}`
              }
            ]
          }
        ]
      })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    return 'Sorry, I encountered an error processing your request.'
  }
}

