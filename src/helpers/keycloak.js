import Keycloak from 'keycloak-js'

export const keycloak = new Keycloak('/keycloak.json');

export const getToken = () => keycloak.token;

