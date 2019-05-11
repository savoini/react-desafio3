import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapGL, { Marker } from 'react-map-gl';

import User from '../../components/User';

import { Creators as MapaActions } from '../../store/redux/mapa';
import Search from '../../components/Search';

class Main extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleMapClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    const { addPointRequest } = this.props;

    addPointRequest(latitude, longitude);
  };

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  render() {
    const { viewport } = this.state;
    const { github } = this.props;

    return (
      <Fragment>
        <Search />
        <User />
        <MapGL
          {...viewport}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          mapboxApiAccessToken="pk.eyJ1Ijoic2F2b2luaSIsImEiOiJjanZpNGk51ZWUwMjV4NDNsNmgzczM2b2t2In0.zf0F33QNzEGqfRP5Kda0ow"
          onViewportChange={v => this.setState({ viewport: v })}
          style={{ position: 'relative' }}
        >
          {github.data.map(user => (
            <Marker
              key={user.id}
              latitude={user.latitude}
              longitude={user.longitude}
              onClick={this.handleMapClick}
              captureClick
            >
              <img
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48,
                }}
                src={user.avatar}
                alt={user.name}
              />
            </Marker>
          ))}
        </MapGL>
      </Fragment>
    );
  }
}

Main.propTypes = {
  addPointRequest: PropTypes.func.isRequired,
  github: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        location: PropTypes.string,
        avatar: PropTypes.string,
      }),
    ),
    error: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  github: state.github,
  mapa: state.mapa,
});

const mapDispatchToProps = dispatch => bindActionCreators(MapaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
