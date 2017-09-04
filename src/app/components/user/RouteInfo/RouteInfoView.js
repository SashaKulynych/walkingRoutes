import React,{Component} from "react";
import {RouteInfoDisplay} from '../requestFunction';
import "../styles.css";
import AllComments from './AllComments';
import StarRatingComponent from 'react-star-rating-component';
export default class RouteInfoView extends Component {
    onStarClick(nextValue, prevValue, name) {
        this.props.handleRating(nextValue);
    }
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    {this.props.textRouteName}
                    <i onClick={()=>RouteInfoDisplay(false)} className="fa fa-times fa-lg closeRouteInfo"/>
                </div>
                <div className="card-block">
                    <h5 className="card-title">Category: {this.props.textRouteCategory}</h5>
                    <p className="card-text">
                        {"\n"}
                        {this.props.textRouteDest}
                    </p>
                    <div className="rating">
                        <StarRatingComponent
                            name="rate1"
                            starCount={10}
                            value={this.props.rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"
                               checked={this.props.favorite}
                               onChange={this.props.handleCheckboxFavorite}
                        />
                        <span className="custom-control-indicator"/>
                        <span className="custom-control-description">Favorite route</span>
                    </label>
                    <textarea className="form-control textareaView" id="commentTextarea" rows="3" placeholder="Comment"
                        value={this.props.commentTextarea} onChange={(e)=>this.props.handleState(e,"commentTextarea")}
                    >
                    </textarea>

                    <button type="submit" className="btn btn-primary btn-sm btn-block ButtonStyle"
                            onClick={()=>{this.props.addComment()}}
                    >Add comment</button>
                    <div className="viewAllComments"  data-toggle="modal" data-target="#exampleModalLong">All comments for this route</div>
                    <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Comments</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                   <AllComments
                                       checkedRouteId = {this.props.checkedRouteId}
                                   />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}