import { SIMILAR_PROPOSAL_COUNT, PROPERTY_PRICE_CRITERIAS } from './data.js';
import { markerGroup, createMarkers } from './map-activation.js';

const filterTogglers = document.querySelectorAll('.map__filter');
const housingTypeFilterElement = document.querySelector('[name="housing-type"]');
const housingPriceFilterElement = document.querySelector('[name="housing-price"]');
const housingRoomsFilterElement = document.querySelector('[name="housing-rooms"]');
const GuestsFilterElement = document.querySelector('[name="housing-guests"]');
const housingFeaturesFilterElements = document.querySelectorAll('[name="features"]');

function onChangeFiltersToggler(cb) {
  filterTogglers.forEach((filterToggler) => {
    filterToggler.addEventListener('change', () => {
      markerGroup.clearLayers();
      cb();
    });
  });
}

function onChangeFeaturesToggler(cb) {
  housingFeaturesFilterElements.forEach((item) => {
    item.addEventListener('change', () => {
      markerGroup.clearLayers();
      cb();
    });
  });
}

function getFeaturesCheckedCheckBoxes() {
  const checkBoxFeatures = document.querySelectorAll('[name="features"]:checked');
  const checkedValues = Array.from(checkBoxFeatures).map((item) => item.value);

  return checkedValues;
}

function propertyTypeCompare(proposals) {
  const houseTypeProposal = proposals.filter(
    (proposal) => proposal.offer.type === housingTypeFilterElement.value
  );

  const anyType = housingTypeFilterElement.value === 'any';
  if (anyType) {
    return proposals;
  }

  return houseTypeProposal;
}

function propertyPriceCompare(proposals) {
  const low = housingPriceFilterElement.value === 'low';
  const high = housingPriceFilterElement.value === 'high';
  const middle = housingPriceFilterElement.value === 'middle';
  const anyPrice = housingPriceFilterElement.value === 'any';

  const housePriceMiddle = propertyTypeCompare(proposals).filter(
    (proposal) =>
      proposal.offer.price >= PROPERTY_PRICE_CRITERIAS[0] ||
      proposal.offer.price <= PROPERTY_PRICE_CRITERIAS[1]
  );
  const housePriceLow = propertyTypeCompare(proposals).filter(
    (propop) => propop.offer.price < PROPERTY_PRICE_CRITERIAS[0]
  );
  const housePriceHigh = propertyTypeCompare(proposals).filter(
    (proposal) => proposal.offer.price > PROPERTY_PRICE_CRITERIAS[1]
  );

  if (anyPrice) {
    return propertyTypeCompare(proposals);
  }
  if (low) {
    return housePriceLow;
  }
  if (high) {
    return housePriceHigh;
  }
  if (middle) {
    return housePriceMiddle;
  }
}

function propertyRoomsCompare(proposals) {
  const houseRoomsProposal = propertyPriceCompare(proposals).filter(
    (proposal) => String(proposal.offer.rooms) === housingRoomsFilterElement.value
  );

  const anyRooms = housingRoomsFilterElement.value === 'any';
  if (anyRooms) {
    return propertyPriceCompare(proposals);
  }

  return houseRoomsProposal;
}

function capacityGuestsCompare(proposals) {
  const capacityGuestsProposal = propertyRoomsCompare(proposals).filter(
    (proposal) => String(proposal.offer.guests) === GuestsFilterElement.value
  );

  const anyGuests = GuestsFilterElement.value === 'any';
  if (anyGuests) {
    return propertyRoomsCompare(proposals);
  }

  return capacityGuestsProposal;
}

function propertyFeaturesCompare(proposals) {
  const featureOptions = capacityGuestsCompare(proposals).filter((proposal) =>
    String(proposal.offer.features).includes(getFeaturesCheckedCheckBoxes())
  );
  return featureOptions;
}

const createProposalsFiltered = (proposals) => {
  propertyFeaturesCompare(proposals)
    .slice(0, SIMILAR_PROPOSAL_COUNT)
    .forEach((proposal) => {
      createMarkers(proposal);
    });
};

export { onChangeFiltersToggler, onChangeFeaturesToggler, createProposalsFiltered };
