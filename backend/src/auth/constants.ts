let secret;
if (process.env.JWT_SECRET) {
  secret = process.env.JWT_SECRET;
} else {
  secret = 'alkjdfhklajvalkjsd';
}

export const jwtConstants = {
  secret,
};
