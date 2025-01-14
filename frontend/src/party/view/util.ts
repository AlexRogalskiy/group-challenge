import { PartyStatusResponse, PartySubmissionResponse, Vote } from '../../api/api-models';

export const totalRating = (votes: Vote[]) => votes.reduce((x1, x2) => x1 + x2.rating, 0);

export const avgRating = (votes: Vote[]) => {
  if (votes?.length === 0) {
    return 0;
  }

  return votes.reduce((x1, x2) => x1 + x2.rating, 0) / votes.length;
};

export const avgRatingTwoDecimals = (votes: Vote[]) => {
  return avgRating(votes).toFixed(2);
};

export const sortSubmissions = (submissions: PartySubmissionResponse[]) => {
  const result = [...submissions].sort((a, b) => {
    return avgRating(b.votes) - avgRating(a.votes);
  });

  return result;
};

export const getSubmissionVotes = (
  partyStatus: PartyStatusResponse,
  submission: PartySubmissionResponse,
  userId?: string
) => {
  return partyStatus.votes.filter((vote) => vote.submissionId === submission.id && (!userId || vote.userId === userId));
};
