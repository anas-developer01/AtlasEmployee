import { BaseUrl, ImageBaseUrl } from "../constant/Common";

export const dashboard = (token,status) => {  
    let url = BaseUrl + 'dashboard';
    const result = fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
};  

export const categories = (token) => {  
    const result = fetch(BaseUrl + 'tickets/getCategories', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
};  

export const services = (token) => {  
    const result = fetch(BaseUrl + 'tickets/getServices', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
};  

export const tickets = (token,status) => {  
    let url = BaseUrl + 'tickets/getTickets';
    if(status){
        url = BaseUrl + 'tickets/getTickets?status='+status
    }
    const result = fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
};  

export const addTicke = (token,data) => {  
    const result = fetch(BaseUrl + 'tickets/addTicket', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
};  

export const ticketDetail = (token,id) => {  
    let url = BaseUrl + 'tickets/getTicketDetails?ticket_id='+id;
    const result = fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
};  

export const defaultTicketByPostID = (token,id) => {  
  let url = BaseUrl + 'ticketsStaus/getTicketStatusDetails?tickets_status_id='+id;
  const result = fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  return result;
};  

export const ticketByPost = (token,id) => {  
  let url = BaseUrl + 'ticketsStausPost/getTicketsPostByTicketStatus?tickets_status_id='+id;
  const result = fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  return result;
};  

export const ticketByPostID = (token,id) => {  
  let url = BaseUrl + 'ticketsStausPost/getTicketPostDetails?tickets_status_post_id='+id;
  const result = fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  return result;
};  

export const notifications = (token,id) => {  
  let url = BaseUrl + 'notifications';
  const result = fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  return result;
};  

export const addNewPost = (token,data) => {  
  const result = fetch(BaseUrl + 'ticketsStausPost/addTicketStatusPost', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  return result;
};  

export const update_status = (token,data) => {  
  const result = fetch(BaseUrl + 'ticketsStaus/updateTicketStatus', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  return result;
};  
