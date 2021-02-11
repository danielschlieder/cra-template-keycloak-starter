import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: "https://__KEYCLOAK_HOST__/auth/",
  realm: "__REALM__",
  clientId: "__CLIENTID__",
});

export default keycloak;
