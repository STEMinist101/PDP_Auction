import React, { Component } from 'react'
import {Container,Row,} from 'reactstrap'
import { connect } from 'react-redux';
import {getItem,clearItem, allFetched} from '../../redux/actions/itemActions'
import { clearComments, getComments } from '../../redux/actions/commentActions'
import Comments from '../Comment/Comments'
import Image from './../shared/Image'
import avatar1 from '../../media/avatar-1.png'
import avatar3 from '../../media/avatar-5.png'
import avatar4 from '../../media/avatar-4.png'
// import bag from '../../media/bag.jpg'

// styles
import styles from './styles/LastBids.scss'
import Bid from '../Bid/Bid';

class ViewItem extends Component {

    componentDidMount(){
        this.props.getItem(this.props.match.params.title, this.props.match.params.uuid);
    }
    
    componentDidUpdate(){
        if(this.props.item && !this.props.comments){
            this.props.getComments(this.props.item.comments);
            document.title = `Barkley's Store | ${this.props.item.title}`;
        }
    }
    
    componentWillUnmount(){
        this.props.clearItem();
        this.props.clearComments();
        this.props.allFetched(false);
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <main className="col-12 col-sm-6 col-md-8">
                        <Row>
                            <div className="col-12 col-md-4 col-lg-3">
                                {this.props.item === undefined && (
                                    <div className="spinner-border text-danger" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                                {this.props.item && 
                                    <Image source={this.props.item.imageUrl} cssClass="img-fluid mx-auto block"/>
                                }
                                {/* <img src={this.props.item && this.props.item.imageUrl} className="img-fluid mx-auto d-block" alt={this.props.item && this.props.item.title}/> */}
                                {/* {this.props.item != null ? (
                                    <img src={`/media/${this.props.item.title}.jpg`} className="img-fluid mx-auto d-block" alt={this.props.item ? this.props.item.title:'Product is not here!'}/>
                                ): (
                                    <span>Loading ...</span>
                                )} */}

                                {/* <img src={bag.substr(2)} className="img-fluid" alt={this.props.item ? this.props.item.name:'Product is not here!'}/> */}

                                {/* {this.props.item !=null ? (

                                    <img src={require('../media/bag.jpg').substr(2)} className="img-fluid" alt={this.props.item.name}/>
                                ):(
                                    <div>Loading ...</div>
                                )} */}
                            </div>
                            <div className="col-12 col-md-8 col-lg-9">
                                {this.props.item != null ? (
                                    <>
                                        <h1>
                                            {this.props.item.title} -  
                                            {!this.props.item.sold ? 
                                            (<span className="text-success avail-status">Available</span>) 
                                            :
                                            (<span className="text-danger avail-status">Sold for <i className="fas fa-pound-sign xs-margin"></i>{this.props.item.startingBid.toLocaleString()}</span>)}
                                        </h1>
                                        <h4>Last bid was <i className="fas fa-pound-sign xs-margin"></i>{this.props.item.startingBid.toLocaleString()}</h4>
                                    </>
                                ):(
                                    <div>Loading ...</div>
                                )}
                                {/* <h5 className="card-title">{this.props.match.params.name} -- {this.props.match.params.id}</h5> */}
                                    
                                <p>
                                    {this.props.item && this.props.item.description}
                                </p>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 col-sm-12 col-md-10 offset-md-1">
                                <Comments comments={this.props.item && this.props.item.comments}/>
                            </div>
                        </Row>
                    </main>
                    <div className={styles.lastBidsContainer} id="bids-list-group">
                        <Bid/>
                        <h2 className="bid-title">Last bids
                            <span>for {this.props.item && this.props.item.title}</span>
                        </h2>

                        {/* <div className="bids-loader">
                            <div role="status" className="spinner-border text-danger">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> */}

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="media">
                                    <img src={avatar1.substr(2,avatar1.length+1)} className="mr-3 avatar-img"/>                                    
                                    <div className="media-body">
                                        <h5 className="mt-0">rosa_55r</h5>
                                        is bidding <i className="fas fa-pound-sign xs-margin"></i> 235 - a few minutes ago
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="media">
                                    <img src={avatar3.substr(2,avatar3.length+1)} className="mr-3 avatar-img" alt="..."/>
                                    <div className="media-body">
                                        <h5 className="mt-0">rip_slayer</h5>
                                        Bids <i className="fas fa-pound-sign xs-margin"></i> 225 - a few minutes ago
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="media">
                                    <img src={avatar4.substr(2,avatar4.length+1)} className="mr-3 avatar-img" alt="..."/>
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
                    </div>

                </Row>
            </Container>
        );
    }
};

const mapStateToProps = store => ({
    item: store.items.item,
    comments: store.comments.comments
});

export default connect(mapStateToProps,{getItem, allFetched, clearItem, clearComments, getComments})(ViewItem);