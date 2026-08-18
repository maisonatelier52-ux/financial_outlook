const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  "Finance",
  "Technology",
  "Market",
  "Sports",
  "Business"
];

const AUTHORS = [
  { name: "Eleanor Vance", role: "Senior Editor", email: "e.vance@newstimes.com", website: "https://example.com/evance" },
  { name: "Julian Thorne", role: "Chief Investigative Reporter", email: "j.thorne@newstimes.com", website: "https://example.com/jthorne" },
  { name: "Maya Rossi", role: "Technology Correspondent", email: "m.rossi@newstimes.com", website: "https://example.com/mrossi" },
  { name: "David Chen", role: "Financial Analyst", email: "d.chen@newstimes.com", website: "https://example.com/dchen" },
  { name: "Sarah Jenkins", role: "Cultural Critic", email: "s.jenkins@newstimes.com", website: "https://example.com/sjenkins" }
];

const PARAGRAPHS_POOL = [
  "In a surprising turn of events, experts are now predicting a massive shift in how the industry operates over the next decade. The implications are vast, affecting everything from daily operations to long-term strategic planning. Stakeholders are advised to monitor the situation closely as new developments unfold at a rapid pace.",
  "The data paints a clear picture. With investment pouring in at record levels, the sector is poised for unprecedented growth. Experts advise cautious optimism, as market volatility remains a constant factor. However, the underlying fundamentals suggest a strong trajectory that could redefine market standards.",
  "As the situation continues to unfold, one thing is certain: the landscape is changing rapidly. Those who adapt quickly will likely find themselves at a distinct advantage, while those who hesitate may struggle to keep up. Innovative approaches are no longer optional; they are essential for survival in this highly competitive environment.",
  "Recent policy shifts have introduced a new layer of complexity to an already intricate ecosystem. Analysts are divided on the long-term impact, but most agree that the short-term effects will be felt across all tiers of the market. Regulatory compliance is now at the forefront of executive discussions.",
  "Technological advancements are driving much of this change. From artificial intelligence to decentralized networks, the tools available today are more powerful than ever before. This digital transformation is not just improving efficiency; it is fundamentally altering the nature of the work itself.",
  "Despite the optimism, significant challenges remain. Infrastructure bottlenecks, talent shortages, and geopolitical tensions all pose risks to the current growth models. Navigating these obstacles will require unprecedented collaboration between public and private sectors.",
  "Consumer behavior is also shifting in response to these broader macroeconomic trends. There is a growing demand for transparency and sustainability, forcing companies to re-evaluate their supply chains and corporate governance structures. The modern consumer is more informed and more demanding than previous generations.",
  "Looking ahead, the next quarter will be crucial. Earnings reports will provide the first hard evidence of whether these strategic pivots are bearing fruit. The market is waiting with bated breath, and any deviation from expectations could trigger significant volatility.",
  "In conclusion, while the path forward is fraught with uncertainty, it is also lined with opportunity. The key to success will be agility, foresight, and a willingness to embrace disruption. The rules of the game are being rewritten, and the winners will be those who can adapt fastest.",
  "Moreover, the international community has started to take notice. Cross-border collaborations are becoming more frequent as organizations realize that some challenges cannot be tackled in isolation. The pooling of resources and expertise represents a paradigm shift in global problem-solving."
];

// Helper to generate a ~1000 word article (each paragraph above is ~60 words. 1000/60 = ~17 paragraphs)
function generateContentBlocks() {
  const blocks = [];
  
  // We want about 17 paragraphs to reach ~1000 words.
  // We'll insert a heading every 4-5 paragraphs.
  const totalParagraphs = 17;
  
  for (let i = 0; i < totalParagraphs; i++) {
    if (i > 0 && i % 4 === 0) {
      blocks.push({
        type: "h2",
        text: `Key Development Phase ${i / 4}`
      });
    }
    
    // Pick a random paragraph from the pool and slightly randomize it to avoid exact duplication
    const basePara = PARAGRAPHS_POOL[Math.floor(Math.random() * PARAGRAPHS_POOL.length)];
    // Add some random filler sentences to ensure we hit the word count
    const filler = " " + PARAGRAPHS_POOL[Math.floor(Math.random() * PARAGRAPHS_POOL.length)];
    
    blocks.push({
      type: "paragraph",
      text: basePara + filler
    });
  }
  
  return blocks;
}

function generateArticles() {
  const articles = [];
  let idCounter = 1;

  // 12 articles per category
  for (const category of CATEGORIES) {
    for (let i = 1; i <= 12; i++) {
      const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
      
      const headline = `The Future of ${category}: In-Depth Analysis Part ${i}`;
      const slug = `${category.toLowerCase()}-analysis-part-${i}`;
      const excerpt = `A comprehensive look at the latest trends in ${category}. This 1000-word deep dive explores the nuances, challenges, and opportunities that are shaping the landscape today.`;
      
      articles.push({
        id: idCounter.toString(),
        slug: slug,
        headline: headline,
        excerpt: excerpt,
        author: author.name,
        category: category,
        date: `August ${Math.floor(Math.random() * 28) + 1}, 2026`,
        time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 50) + 10} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        photoUrl: `https://picsum.photos/seed/${idCounter}/1200/800`,
        content: generateContentBlocks()
      });
      
      idCounter++;
    }
  }

  return articles;
}

function generateAuthorsData() {
  return AUTHORS.map(a => {
    return {
      id: a.name.toLowerCase().replace(/\s+/g, '-'),
      slug: a.name.toLowerCase().replace(/\s+/g, '-'),
      name: a.name,
      role: a.role,
      email: a.email,
      website: a.website,
      avatarUrl: `https://i.pravatar.cc/300?u=${encodeURIComponent(a.email)}`,
      biography: `${a.name} is a distinguished journalist with over 15 years of experience covering global affairs. Their work has been recognized with numerous industry awards for excellence in investigative reporting and insightful analysis. When not writing, ${a.name} can be found exploring the intersection of technology and society, always searching for the next compelling story that needs to be told.`
    };
  });
}

function main() {
  const publicDataDir = path.join(__dirname, '..', 'public', 'data');
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }

  const articles = generateArticles();
  const authors = generateAuthorsData();

  fs.writeFileSync(path.join(publicDataDir, 'articles.json'), JSON.stringify(articles, null, 2));
  fs.writeFileSync(path.join(publicDataDir, 'authors.json'), JSON.stringify(authors, null, 2));

  console.log(`Generated ${articles.length} articles (~1000 words each) and ${authors.length} authors.`);
}

main();
