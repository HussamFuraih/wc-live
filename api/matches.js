export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { endpoint = 'matches', status } = req.query;
  const API_KEY = process.env.FOOTBALL_API_KEY;
  
  let url = `https://api.football-data.org/v4/competitions/WC/${endpoint}`;
  if (status) url += `?status=${status}`;

  try {
    const r = await fetch(url, { headers: { 'X-Auth-Token': API_KEY } });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
