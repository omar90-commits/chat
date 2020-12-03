const getMessagesSend = JSON.parse(localStorage.getItem('messages-chat'));

export const convertArrayToObject = getMessagesSend?.reduce((acc:any, el:any) => (acc[el[0]] = el[1], acc), {});