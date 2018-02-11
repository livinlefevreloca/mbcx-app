import imapclient, pyzmail, os, datetime


def log_into_email():
    try:
        imapSession = imapclient.IMAPClient('imap.gmail.com', ssl=True)
        check, acount = imap.login('Adamtlefevre@gmail.com', os.environ['EMAIL_PW'])
        if check != 'OK':
            raise
        else:
            return imapSession
    
def search_for_message(client):
    client.select_folder('INBOX', readonly=True)
    email = "connect@key2act.com"
    date = datetime.datetime.now().strftime('%d-%b-%Y')
    search_str = "SINCE " + date
    UIDs = client.search([search_str])
    for U in UIDs:
        raw_message = client.fetch(U, ['BODY[]'])
        message = pyzmail.PyzMessage.factory(raw_message)
        if message.get_addresses('from') == email:
            
    