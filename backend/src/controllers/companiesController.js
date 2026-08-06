import { getCompanies } from '../services/companiesService.js';

export async function listCompanies(req, res, next) {
  try {
    const { search } = req.query;
    const data = await getCompanies(search);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
