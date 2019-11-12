import React, { Fragment, useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import useBeforeFirstRender from "../hooks/useBeforeFirstRender";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);
    let reqInt;
    let resInt;
    useBeforeFirstRender(() => {
      reqInt = axios.interceptors.request.use(req => {
        setError(null);
        return req;
      });
      resInt = axios.interceptors.response.use(
        res => res,
        error => {
          setError(error);
        }
      );
    });
    useEffect(() => {
      return () => {
        console.log("withErrorHandler Unmount", reqInt, resInt);
        axios.interceptors.request.eject(reqInt);
        axios.interceptors.response.eject(resInt);
      };
    }, [reqInt, resInt]);

    const errorConfirmedHandler = () => {
      setError(null);
    };
    return (
      <Fragment>
        <Modal show={error} modalHandler={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
