import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBids } from '../../redux/actions/bidActions'
import RandomAvatar from '../shared/RandomAvatar'

const Bids = ({getBids, item}) => {
    const {uuid} = useParams();
    
    useEffect(() => {
        getBids(uuid);
    },[]);
    
    return(
        <>
            <h2 className="bid-title">Last bids
                <span>for {item && item.title}</span>
            </h2>

            {/* <div className="bids-loader">
                <div role="status" className="spinner-border text-danger">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> */}

            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="media">
                        {/* <img src={avatar1.substr(2,avatar1.length+1)} className="mr-3 avatar-img"/>                                     */}
                        <RandomAvatar width="40px" height="40px"/>
                        <div className="media-body ml-3">
                            <h5 className="mt-0">rosa_55r</h5>
                            bids <i className="fas fa-pound-sign xs-margin"></i> 235 - a few minutes ago
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="media">
                        {/* <img src={avatar3.substr(2,avatar3.length+1)} className="mr-3 avatar-img" alt="..."/> */}
                        <RandomAvatar width="40px" height="40px"/>
                        <div className="media-body ml-3">
                            <h5 className="mt-0">rip_slayer</h5>
                            Bids <i className="fas fa-pound-sign xs-margin"></i> 225 - a few minutes ago
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="media">
                        {/* <img src={avatar4.substr(2,avatar4.length+1)} className="mr-3 avatar-img" alt="..."/> */}
                        <RandomAvatar width="40px" height="40px"/>
                        <div className="media-body">
                            <h5 className="mt-0">merry_eli_992</h5>
                            Bids <i className="fas fa-pound-sign xs-margin"></i> 217 - a few minutes ago
                        </div>
                    </div>
                </li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
        </>
    );
};

const mapStateToProps = state => ({
    bids: state.bids.bids,
    item: state.items.item
});

export default connect(mapStateToProps, {getBids})(Bids);