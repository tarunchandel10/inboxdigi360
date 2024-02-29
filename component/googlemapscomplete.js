import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
import FormCss from '../styles/form.module.css';
import Button from 'react-bootstrap/Button';
import { CheckCircle, SlashCircle } from 'react-bootstrap-icons';
import { GOOGLE_API_KEY } from '@/common/constants';

const libraries = ["places"];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Googlemapscomplete = ({ onIncludeChange, onExcludeChange, selectedLocation }) => {
  const [addresses, setAddresses] = useState(new Set());
  const [includedLocations, setIncludedLocations] = useState([]);
  const [excludedLocations, setExcludedLocations] = useState([]);
  const [radiusMiles, setRadiusMiles] = useState(3);
  const [disableRadiusInput, setDisableRadiusInput] = useState(false);
  const [center, setCenter] = useState({ lat: 28.656158, lng: 77.241020 });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const autocomplete = useRef(null);
  const inputRef = useRef(null);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries
  });

  useEffect(() => {
    if (selectedLocation) {
      const includeData = selectedLocation.filter(item => item.type === 'include').map(item => ({ name: item.name, lat: parseFloat(item.latLng.lat), lng: parseFloat(item.latLng.lng) }));
      const excludeData = selectedLocation.filter(item => item.type === 'exclude').map(item => ({ name: item.name, lat: parseFloat(item.latLng.lat), lng: parseFloat(item.latLng.lng) }));

      setIncludedLocations(includeData);
      setExcludedLocations(excludeData);
      onIncludeChange(includeData);
      onExcludeChange(excludeData);
      const selectedAddresses = selectedLocation.map(item => item.name);
      setAddresses(new Set(selectedAddresses));
    } else {
      setIncludedLocations([]);
      setExcludedLocations([]);
      onIncludeChange([]);
      onExcludeChange([]);
      setAddresses(new Set());
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (isLoaded && !loadError) {
      autocomplete.current = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.current.addListener('place_changed', handlePlaceChanged);
    }
  }, [isLoaded, loadError]);

  const handlePlaceChanged = () => {
    const place = autocomplete.current.getPlace();
    if (place && place.geometry) {
      const newAddress = place.formatted_address;
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      const newDisableRadiusInput = place.types.includes('country') || place.types.includes('postal_code');
      if (!addresses.has(newAddress)) {
        setAddresses(prevAddresses => new Set([...prevAddresses, newAddress]));
        setCenter(newCenter);
        setSelectedAddress(newCenter);
        setDisableRadiusInput(newDisableRadiusInput);
        if (mapRef.current) {
          mapRef.current.panTo(newCenter);
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(new window.google.maps.LatLng(newCenter.lat, newCenter.lng));
          bounds.extend(new window.google.maps.LatLng(newCenter.lat + radiusMiles * 0.03, newCenter.lng));
          mapRef.current.fitBounds(bounds);
        }
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    } else {
      console.error('Place is not valid or does not have geometry');
    }
  };

  const handleRadiusChange = (event) => {
    const newRadiusMiles = parseFloat(event.target.value);
    setRadiusMiles(newRadiusMiles);
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(center.lat, center.lng));
      bounds.extend(new window.google.maps.LatLng(center.lat + newRadiusMiles * 0.03, center.lng));
      mapRef.current.fitBounds(bounds);
    }
  };

  const handleInclude = (place) => {
    const isExcluded = excludedLocations.find(loc => loc.name === place);

    if (!includedLocations.find(loc => loc.name === place)) {
      const placeDetails = {
        name: place,
        lat: center.lat,
        lng: center.lng
      };

      setIncludedLocations(prev => [...prev, placeDetails]);
      onIncludeChange([...includedLocations, { name: place, lat: center.lat, lng: center.lng }]);

      if (isExcluded) {
        setExcludedLocations(prev => prev.filter(location => location.name !== place));
        onExcludeChange([...excludedLocations.filter(loc => loc.name !== place)]);
      }
    }
  };

  const handleExclude = (place) => {
    const isIncluded = includedLocations.find(loc => loc.name === place);

    if (!excludedLocations.find(loc => loc.name === place)) {
      const placeDetails = {
        name: place,
        lat: center.lat,
        lng: center.lng
      };

      setExcludedLocations(prev => [...prev, placeDetails]);
      onExcludeChange([...excludedLocations, { name: place, lat: center.lat, lng: center.lng }]);

      if (isIncluded) {
        setIncludedLocations(prev => prev.filter(location => location.name !== place));
        onIncludeChange([...includedLocations.filter(loc => loc.name !== place)]);
      }
    }
  };

  const handleRemoveLocation = (place, listType) => {
    if (listType === 'include') {
      const updatedIncludedLocations = includedLocations.filter(location => location.name !== place);
      setIncludedLocations(updatedIncludedLocations);
      onIncludeChange(updatedIncludedLocations);
    } else if (listType === 'exclude') {
      const updatedExcludedLocations = excludedLocations.filter(location => location.name !== place);
      setExcludedLocations(updatedExcludedLocations);
      onExcludeChange(updatedExcludedLocations);
    }
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <input ref={inputRef} id="autocomplete-input" type="text" placeholder="Enter Address" />
          <div className={`${FormCss.map_op}`} >
          <div>
            <p>Selected Location:</p>
            <ul>
              {[...addresses].map((address, index) => (
                <li key={index}>{address}
                  <div className={`${FormCss.languages_btns}`}>
                    <Button
                      onClick={() => handleInclude(address)}
                      className={`include_btn ${includedLocations.find(loc => loc.name === address) ? 'clicked-btn' : ''
                        } `}
                    >
                      <CheckCircle />
                    </Button>
                    <Button
                      onClick={() => handleExclude(address)}
                      className={`exclude_btn ${excludedLocations.find(loc => loc.name === address) ? 'clicked-btn' : ''
                        }`}
                    >
                      <SlashCircle />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {
            includedLocations.length > 0 ?
              <>
                <div className="map-setting">
                  <h3 className='text-success'>Included Location</h3>
                  <ul>
                    {includedLocations.map((item, index) => {
                      return (
                        <>
                          <li key={index}>{item.name}
                            <span
                              className="cross-icon"
                              onClick={() => handleRemoveLocation(item.name, 'include')}
                            >
                              &#10006;
                            </span></li>
                        </>
                      )

                    })}
                  </ul>
                </div>
              </> : ""
          }

          {
            excludedLocations.length > 0 ?
              <>
                <div className="map-setting">
                  <h3 className='text-danger'>Excluded Location</h3>
                  <ul>
                    {excludedLocations.map((item, index) => {
                      return (
                        <>
                          <li key={index}>{item.name}
                            <span
                              className="cross-icon"
                              onClick={() => handleRemoveLocation(item.name, 'exclude')}
                            >
                              &#10006;
                            </span></li>
                        </>
                      )
                    })}
                  </ul>
                </div>
              </> : ""
          }
        </div>
        </div>
        <div className='col-6 position-relative'>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              options={options}
              onLoad={(map) => mapRef.current = map}
            >
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default Googlemapscomplete;