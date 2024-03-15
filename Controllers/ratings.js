export const useRatings = () =>{
    const itemId = req.params.itemId;

    if (!ratings[itemId]) {
        return res.status(404).json({ error: 'Item not found.' });
    }

    const totalRatings = ratings[itemId].length;
    const averageRating = ratings[itemId].reduce((acc, curr) => acc + curr, 0) / totalRatings;

    res.json({ itemId, averageRating });
}