import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapGL, { Marker } from 'react-map-gl';

import Users from '../../components/Users';

import { Creators as GithubActions } from '../../store/redux/github';
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
    modal: true,
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

    alert(`Latitude: ${latitude} \nLongitude: ${longitude}`);
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
    const { viewport, modal } = this.state;
    return (
      <Fragment>
        <Users />
        <MapGL
          {...viewport}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          mapboxApiAccessToken="pk.eyJ1Ijoic2F2b2luaSIsImEiOiJjanZpNGk5ZWUwMjV4NDNsNmgzczM2b2t2In0.zf0F33QNzEGqfRP5Kda0ow"
          onViewportChange={v => this.setState({ viewport: v })}
          style={{ position: 'relative' }}
        >
          <Marker
            latitude={-23.5439948}
            longitude={-46.6065452}
            onClick={this.handleMapClick}
            captureClick
          >
            <img
              style={{
                borderRadius: 100,
                width: 48,
                height: 48,
              }}
              src="https://avatars2.githubusercontent.com/u/2254731?v=4"
              alt=""
            />
          </Marker>
        </MapGL>
        {modal && (
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    Modal title
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

Main.propTypes = {
  addUserRequest: PropTypes.func.isRequired,
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
});

const mapDispatchToProps = dispatch => bindActionCreators(GithubActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
