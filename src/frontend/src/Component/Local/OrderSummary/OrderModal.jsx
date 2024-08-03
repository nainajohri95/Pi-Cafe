import React, { useState } from "react";
import Modal from "react-modal";
import { customModalStyle } from "../../../Constant/Global/CustomModalStyle.Constant";
import PaymentGatewayModal from "./PaymentGatewayModal";
import { TransactionComplete } from "./TransactionComplete";
import { TransactionFailed } from "./TransactionFailed";
const OrderModal = ({
  orderItems,
  order,
  setOrder,
  openModal,
  setOpenModal,
}) => {

  const [modalType, setModalType] = useState("payment-gateway");
  const [showError, setShowError] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [loading, setLoading] = useState(false);

  const sharedProps = {
    orderItems,
    setOpenModal,
    order,
    setOrder,
    setModalType,
    selectedPaymentType,
    setLoading,
    loading,
    showError,
    setShowError,
  };

  return (
    <Modal isOpen={openModal} style={customModalStyle}>
      {modalType === "payment-gateway" ? (
        <PaymentGatewayModal
          setSelectedPaymentType={setSelectedPaymentType}
          {...sharedProps }
        />
      ) : modalType === "transaction-successful" ? (
        <TransactionComplete />
      ) : (
        <TransactionFailed {...sharedProps} />
      )}
    </Modal>
  );
};

export default OrderModal;
