import connection from '../db-config';
import IBadge from '../interfaces/IBadge';

// get unlocked badges by user

const getBadgesByUser = async (idUser: number): Promise<IBadge[]> => {
  const results = await connection
    .promise()
    .query<IBadge[]>(
      'SELECT * FROM badges INNER JOIN unlockedBadges ON unlockedBadges.idBadge = badges.id WHERE unlockedBadges.idUser = ?',
      [idUser]
    );
  return results[0];
};

export default { getBadgesByUser };
