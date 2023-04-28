import React from 'react'
import actions from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const CheckoutSummary = props => {
  const { addAddress } = props;

  console.log(addAddress)
  return (
    <div>
      <p>{ }</p>
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    addressFormData: state.address.addressFormData,
    formErrors: state.address.formErrors,
    history: ownProps.history,
    addAddress: state.addAddress
  };
};


export default withRouter(connect(mapStateToProps, actions)(CheckoutSummary));

