export class AuthServiceMock {
  hashPassword(pass: string, salt: string) {
    // Simuler un hachage de mot de passe réussi
    return 'hashed_password';
  }

  verify(hashed_pwd, password, salt) {
    // Simuler la vérification de mot de passe réussie
    return true;
  }

  async signIn(username: string, pass: string) {
    // Simuler la création d'un token d'accès
    return { access_token: 'mock_access_token' };
  }

  makePayload(login) {
    // Simuler la création d'un payload de token
    return { access_token: 'mock_access_token' };
  }

  extractTokenFromHeader(request) {
    // Simuler l'extraction d'un token d'accès de l'en-tête de la requête
    return 'mock_access_token';
  }

  getTokenInfoFromReq(request) {
    // Simuler la décodage d'un token d'accès
    return { sub: 'mock_username' };
  }
}
