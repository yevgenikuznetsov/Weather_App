export const getErrorMessage = (statusCode) => {
    switch (statusCode) {
      case 400:
        return "There was an issue with your request. Please check your input and try again.";
      case 401:
        return "You are not authorized to perform this action.";
      case 403:
        return "You do not have permission to access this resource.";
      case 404:
      case 500:
        return "An unexpected error occurred on the server. Please try again.";
      default:
        return "An unknown error occurred. Please try again.";
    }
  };