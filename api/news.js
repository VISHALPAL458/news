export default async function handler(req, res) {
  const {
    category = "general",
    page = 1,
    pageSize = 8,
    country = "us",
  } = req.query;

  const apiKey = "b6171165489c4a679e550ec4874ae39b"; // keep secret!
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
