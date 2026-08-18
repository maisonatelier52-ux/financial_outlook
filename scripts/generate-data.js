const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  "US News",
  "World",
  "Politics",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Culture",
  "Climate",
  "Opinion"
];

const AUTHORS = [
  "Eleanor Vance",
  "Julian Thorne",
  "Maya Rossi",
  "David Chen",
  "Sarah Jenkins",
  "Marcus Wright",
  "Elena Rostova",
  "Jameson Locke",
  "Clara Hughes",
  "Aiden Pierce"
];

const HEADLINES = [
  "Global Markets Rally Amid Speculation of New Economic Policies",
  "The Next Frontier: Breakthroughs in Quantum Computing",
  "Climate Summit Ends with Historic Agreement on Emissions",
  "A New Era of Space Exploration Begins",
  "Election Results: What It Means for the Future",
  "The Rise of Artificial Intelligence in Healthcare",
  "Tech Giants Face New Regulatory Scrutiny",
  "Breakthrough in Renewable Energy Technology",
  "Cultural Renaissance: The Resurgence of Independent Art",
  "Understanding the Latest Advancements in Genetic Research",
  "Urban Development: Building the Cities of Tomorrow",
  "The Economic Impact of Global Supply Chain Disruptions",
  "Inside the Lab: Scientists Discover New Species",
  "Opinion: Why We Need to Rethink Our Approach to Education",
  "The Future of Work in a Post-Pandemic World"
];

const PARAGRAPHS = [
  "In a surprising turn of events, experts are now predicting a massive shift in how the industry operates over the next decade. The implications are vast, affecting everything from daily operations to long-term strategic planning.",
  "Recent studies have shown that this approach not only increases efficiency but also significantly reduces the environmental footprint. Stakeholders are already beginning to take notice, with many reevaluating their current practices.",
  "However, not everyone is convinced. Critics argue that the current pace of adoption is too fast, potentially overlooking critical safety and ethical concerns that must be addressed before widespread implementation.",
  "As the situation continues to unfold, one thing is certain: the landscape is changing rapidly. Those who adapt quickly will likely find themselves at a distinct advantage, while those who hesitate may struggle to keep up.",
  "The data paints a clear picture. With investment pouring in at record levels, the sector is poised for unprecedented growth. Experts advise cautious optimism, as market volatility remains a constant factor."
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSlug(headline, index) {
  return headline.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + index;
}

function generateContent() {
  const content = [];
  const numParagraphs = Math.floor(Math.random() * 4) + 4; // 4 to 7 paragraphs
  
  for (let i = 0; i < numParagraphs; i++) {
    if (i === 2) {
      content.push({
        type: "h2",
        text: "The Underlying Implications"
      });
    } else if (i === 4) {
      content.push({
        type: "h2",
        text: "Looking Ahead"
      });
    }
    content.push({
      type: "paragraph",
      text: getRandomItem(PARAGRAPHS) + " " + getRandomItem(PARAGRAPHS)
    });
  }
  return content;
}

function generateArticles() {
  const articles = [];
  const now = new Date();

  for (let i = 1; i <= 60; i++) {
    const category = getRandomItem(CATEGORIES);
    const author = getRandomItem(AUTHORS);
    const headlineBase = getRandomItem(HEADLINES);
    const headline = `${headlineBase} - Part ${i}`;
    const slug = generateSlug(headlineBase, i);
    
    // Generate dates within the last 30 days
    const dateObj = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const date = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    articles.push({
      id: i.toString(),
      slug,
      headline,
      excerpt: "An in-depth look at the recent developments and what they mean for the future. Experts weigh in on the potential impacts and challenges ahead.",
      author,
      category,
      date,
      time,
      photoUrl: `https://picsum.photos/seed/${i}/1200/800`,
      content: generateContent()
    });
  }

  return articles;
}

function generateAuthors() {
  const authorData = AUTHORS.map((name, index) => {
    return {
      id: (index + 1).toString(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      role: ["Senior Editor", "Investigative Reporter", "Technology Correspondent", "Political Analyst", "Culture Writer"][index % 5],
      biography: `${name} is an award-winning journalist with over a decade of experience covering major global events. Their work has been featured in numerous prestigious publications, bringing incisive analysis to complex issues.`,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@newstimes.com`,
      website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
      avatarUrl: `https://i.pravatar.cc/150?u=${name.replace(/\s+/g, '')}`
    }
  });
  return authorData;
}

const publicDataDir = path.join(__dirname, '..', 'public', 'data');
if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}

const articlesPath = path.join(publicDataDir, 'articles.json');
fs.writeFileSync(articlesPath, JSON.stringify(generateArticles(), null, 2));
console.log(`Generated 60 articles at ${articlesPath}`);

const authorsPath = path.join(publicDataDir, 'authors.json');
fs.writeFileSync(authorsPath, JSON.stringify(generateAuthors(), null, 2));
console.log(`Generated 10 authors at ${authorsPath}`);
