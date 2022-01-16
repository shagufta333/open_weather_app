describe("weather info for user's location", () => {
  beforeEach(() => {
    cy.intercept("https://api.opencagedata.com/geocode/v1/json**", {
      fixture: "location_response.json",
    });
    cy.intercept("https://api.openweathermap.org/data/2.5/**", {
      fixture: "weather_response.json",
    });
  });

  it("is expected to be displayed on initial render", () => {
    cy.visit("/", {
      onBeforeLoad(window) {
        const stubLocation = {
          coords: {
            latitude: 55.7842,
            longitude: 12.4518,
          },
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          (callback) => {
            return callback(stubLocation);
          }
        );
      },
    });
      cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "");
      cy.get("[data-cy=location]").should("contain", "");
      cy.get("[data-cy=description]").should("contain", "cloudy");
    });
  });
});
