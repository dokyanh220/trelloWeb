import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={'MERN STACK'}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label={'Workspace'}
            clickable
          />
        </Tooltip>
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={'Public/Private Workspace'}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="dokyanh220">
            <Avatar
              alt=""
              src="data:image/jpeg;base64,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"
            />
          </Tooltip>
          <Tooltip title="dokyanh220">
            <Avatar
              alt=""
              src="https://i.pinimg.com/736x/a4/81/63/a481639243e8b1cc2579be1e480f2dec.jpg"
            />
          </Tooltip>
          <Tooltip title="dokyanh220">
            <Avatar
              alt=""
              src="https://i.pinimg.com/736x/09/0b/bc/090bbcffd9c72bc9dbcc34506b7cdcc4.jpg"
            />
          </Tooltip>
          <Tooltip title="dokyanh220">
            <Avatar
              alt=""
              src="https://i.pinimg.com/1200x/5c/fb/1c/5cfb1cb37eb2cd7d41fd7d92eace2177.jpg"
            />
          </Tooltip>
          <Tooltip title="dokyanh220">
            <Avatar
              alt=""
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgcBAAj/xAA8EAACAQMDAgUCBAUCBAcBAAABAgMABBEFEiExQQYTIlFhFHEHMoGRI0JSobEVwXLR4fEkM5KiwtLwJf/EABgBAQADAQAAAAAAAAAAAAAAAAABAgME/8QAHhEBAQACAwEBAQEAAAAAAAAAAAECEQMSITEyIkH/2gAMAwEAAhEDEQA/AK7CR4FWeUhPOOIwB0FFW90t5FulUARDDN/Vz3qq8igFiki4boqD596Btpood9uWLMsnrx/NkcUFz38d5bSRXSeWNhVDjvkUummh0/S3icOFmlGW3dSD/wB6u+glvkbTHkSJwROJf5uAcLUfL0wwLFdTGTy23YP9XSgPg1tVDkDYm0IqqPfGTn9KbPd2zWUGycecFHoxjr/0rJ6i1uY2jg4G/wBui9c0ytYo/pHCRNJcHYIpieF7c0Gp0+Ri8W7KruIA7girjEFvWmuCVQjGM96T2NxckguPKctuz8e9OXaGOZluZ90TJu+Se1BQqM3ntE+0KuSc8mrbWZZwJHdlKLgMD0oItL9G8kTFRLkAHtUEtXt7WK4lOUC7tv8AXQM45PNwsjFLf8oJ9j3oiW5tyoVUX0EYI9qU32rGXSyrxjzAoXK9AelAmfyG2TA+YU9ATv8Aeg1kflTqwhOdx6d8V7IzQyuI3IjQYOBSu1EzKstu21uAyo3xUTePaC4beOmPUc/pQG6e8TNO1xIQ2cAtyM1G8vVtoQ8cu3PTjjNJmu5bqRW3AKxBCoMYPvRFwIpky+GRFBx0yaAqO9kcmWTdI4GUGeooJhKqGQKfWN4X2BppbQK0UcpVIokXACDk/f5qu6WJtgh3qcYYE/tQIZ/PQEBAUDFjIB0B963Php2ayi38gjg+/wBqzr+VFbS2rKpQxlSen61ovDEQTT4th3IoPX2oNGnSvCfVXq1W/wCagjKeKR6lIwcAE4zzTmdsVn7yZTcbW/SgY6cQwGDkUzApVp/EY+aZhjjig4sYp5YLW1tHMn8NjMxHQnr+1Kpli02GCRxtNwoaJ15Y4JGD85FHW07o7x2RYADAz7UFnyi1hqC7iJvMicnGwnqfnrQDwETTqLj6lpmmBZo3xiPHKn2PTmtbFYQWtiJ0toeGB2E7ic/NJ5RZ2tnIVYmRySSF6mrNIkmZAs7OCFJCyLkHHagG1aSFtjK6xSOjK6kAgCi9AZ7nS5Il8zAkBwBwQPmq7vSY7hZbrOGYAIvz71DTrua1uYdPR41SQiRnXnac8AmgO1TU7WCVTbuzjow7BaItna9itZDKUjYknAywA6f4FKrqxs7fUDAjbIdpJLn8zewq6KVbFUMjsIwCVX3NBoDdWUMctrdu4dU9P/FQ9tMphkSWR/J4Xd1CrnoKz1xqEogYzqsiv6i+Oc+2f2qnS768mt2tY1cxOPMIxztz1+1BpLqSB5YUt1DRFDnPf5r2NFuEjmE49LbSB+Zcf7YpdZWsram0CSDyvLwXPQA19JBcT3P0WnttSFWyzHA45JoDor+10+/cQSvPvAx7Zqi7v5muRJaGIrJlgjdsDnNII5xfXRtiX24HKKctgc1bfytFcL9KCYT/AAmZj6SwGCM/bFA6gvoooYLgNukTIcHgYyMY/vTKC6e+aQQRKVJ9Oe1Ym5aNCEDPubl0/pJPGP2rTaHqMyW+x4f/AClBJHbmg01jK2xkwfZVzwp70W1tuXzMGl1vfxby+3qP2qV3fyw2/mD0oQcEnIbFB5qcf8IMVKr7jue9aTw6MWcSrz3rCNfz3NuZPzRqf6q3Xh6XdZxnGCVoH6mqWOWIqaNgZ7VRuJk4oIXB4/Ssxftm+XH2rTyj0kms3qSMZgVBBzkEUDKwLKoVuvt7U1ThaVaUJAMsOT3pqI2wMmg42lsY4pAp2MBznvS2CwuhfecQrDJQhhnHz/ath9JDdM5KEFRger9zV0WmDy0CJtHU+5+aDPaVaPdRubhUEVvySR1ph9NIXZpQVCZ2N/UT/wBKY2mnmFpwGzGCcr7miPK82GFVjKjO7PuelBn4JY4I5CdzNgBVx79aqn05LjzpQhRhiQKBjmtMdOHpmEZLHg/FHQWlsoy35ivegwN/pVxqDx3Ug2nYFQKeMjjmrr+zcabbxqm+RyRu9h0rZG1O7YF/hfyjFQfStjdfQnQfegxstrPaWyIkKyIRkqw6/wD40q0m31LS3823KS8FZkOQSCDwPiujz2AHo2bucE1V/pscDKfLDb+9BlvDx+svkRHLPKcEsMKD1x81drESHVJRbvIqFSvoGMmtFDpMNrfJKqAEMGAHajo9PTAO0EHJINBinsRplz9XbxbkWMFEY+pCfel11pNwUHl4fzJmZM8AADjj7V0mbSxKpMgDMetBzaKZQN5yqjAIHNBgZ9IVGimmZlmdg23PGMf86aWEUkDzIFIWdVHPwa0v+hxFABnI457CmEdkvlRxsAViX08d6DPQyAIw2gPgjFL54pbpHCrtROqhutacaOCM8rk5xXkGiKkh5OD1oMWBPGym33Lg8Ken7V0zQ5QbVVACsAOnc0CdDhMysq5kwMn47U3srRIE9IoGKyekA1Ffz5qhm2irIXyOaCyU+k0BIhdwABRkzAJkmhI5VaTAoDraEKg96J21GIYUVZkUGFhHmJ5QRR7PjGc+9e200qyGPqSSASK0B01dpXA2ntX0enqr52Djp8UCmW32CNjkhvzVasaoG8s8huM03a1DKARwK8WxT2z8UAbExRFXAOSDkd6HlhXOV9Rxx2px9HuK55AHArz6PI3bRQKlCjqc7RUJ5W2Dn+Hn9c02FhtUgDrXyacpXBWgVwSkBl4JP5c18IMbmLZ244pu2nIMFVG73r0WAxjFAswjyjI54ANXogG4cZPSjvoenp6VJLMKd2KAIf09q8wGDAEKBTH6UNxjFQ+hAz80CsRDPY1cI8jtRn0I4qQtMUAZQkgcdK+EdG/TY+1feR75oBYkKsT3NEbfTgVZ5XFSKYWgBuPStVwycGrb0EKenFCxkBTQe3bYRsntQGnzDzcZ71fdyAxkdPms7DO0N6Vwdg5LUG+hbKipseaUWN6roOeMCjhcL70Bh2+wqJ2jODzWbGuR7CTICV9v8VZFqnmHJOM0D4njtXgZfsaVC7YLkMcivHupOuCADg/FA6Uj718CAMUj/wBRxhTnI4yO9X294CfUx+1A2BB71MYBpJLqPl5Y52fFTTUi20qDigccZqXFLDfMCCB17V8t8xOP74oGnFe8UGJ2bpVokYqPegv4qJxVW968Z3xwKCwmvODQ5eQnuK8LyDtmgJ4rwkChjLIB0qt7iQdqA3cKi7DGKXPeOP5KmbnKZIoKdQbC9aEib3qd4xcDBqqHBUjuKCF4N0LDHNYlmn+qkQE9ema2t7wjc44rKTRhbnepwx70DWyuyoRVXGBg03jmygOetJbKBsZBpoqFVAAoMqGZII3iBwB693vTPTjPOYjIdm7oAKX2VwWhRpLfapXIB/mJ4ptYSFW9S7QBxQNIX2lkblu+ajeXbbtqjCniqIZjKWkBy2f7e9eSYdWG7LgZXHQnjiguRT5zbgSMcUQuEkAdugqtZFVMuvrx2qm5VpNvlbwW/MW6Z70B0KpMrszgAHAFELEqkALz/alsNs8bD1uSO/60ak+MLIG3LQE3BWCGSYgehCx+MA1zz8OvxNi1JvoNeQRSs+ILjGQ+TwG9jWs8R33leHNTcPhxbSBc/wBRXgVw2y0h5LMM4KbVzkt1AqmWWmmOHZ+nEaLbkJnPfbxirVAAxtPuMjpXDdL8eaj4Ts4bWRWvoDAHg8x8MgP9Xv8AHevLT8XtQnuQjWwwx4LsMD9hSZ7RcLHdcZ4qKptGASfkmuF3f4t6nBKyLZKyg8EYO7jtVY/F/UR6m087fcbfep7I613ZlJwOnPWoE7F9fTPU1xZPxjnA/iaM0hJ4IkAq+D8WriYv5WgytsXc22UcD3qO6eldiblc0NLXIoPxpP1kKPpUoRmCkeYCeTiujXWqrGzDB4PerT1WzQqdsVBZN4weKTz6uhGcGirWfzhUoFuM9a8RFHIr0/lFSh756UAepcQtgdqQWls012Sfy56Vo7wKVahbGJQxI70BVtaAIO1FC2AHWiIU9NWFaDncru85kUOsMjbgq9mOM4/WibWVy3JPTH6UKl8FdFYqNvKr3GPepy3EJRfp8qzNlmB6D5oHFsWiJZSD2247UaIwPURyfilun3ShlGN2TwSOaJubpsFlOQAdwA5AzQG4ClRIwVSRV6urIfysFOKzM2qrFPHGQWGec+1TFzI22MKck5yDQaV5FWIhcbvYVWpUSBpCM9CKUr9SZNxGMDHJqd1e+UD5oB+3SgG8bXEFv4fNzNCJkWeP+GSVB6g5x8ZrA2kiSWxKr5cDM4jB5HGMgfoR1NN/xK1b/wDi6baQ/mnuyDu7AIf/ALCs7Y2ccK29xKxdOcxo+Cce46HnH7Vjn9dHF8LdfvDfyQgRYlgjMTknIcZ4P7UBaafvcbV69RkUbJbxRXLxMSGUdjyKvsZRC3q6k9jmsrlp0THYiewiMSpHGocAekjPagH05ipXy/yn24qS6fJP4mF+9wTFkMq45HHT2xWpmSL6fd7989SKi3rPKie/YzFnpwjX+Iu0k4GTU7nT/KVlhYqWGCAfzD2NR8R6Zc6j9NJbzpGkfDoCRg+9EzROIh/FxwMZ74HvUfPdrS23WifTtNEvibSYMcPeR5HwDk/2Fdjurldzbxlutc68EWxu/F1m5TItw8pb5Ckf71vrshpXO0njPSunjvjk5v0ipMjAA8EitJYIMdKxkk0izIIzuUYPFbDS5CYx/Ua0YmDL6a8j754qbdDVQbNBReY2MCetC2oCOcZ61fdMpzk0DDKu/wBR70GjgbKAmrweKBtnBQYojdQcjjdZ4lZ3OZDsGfvUI/PHmKF9AO3dn8xp3PpkbG3jKZwRggdsUUmlmCJYsZwc59qCFhLHBaM0smXC5B+cdKHgu7h5JJGbgkcZ5p3baePLRTHnnJOKOg8L2wczfzNzj2oFT6ZJcSxyHaQO571fLJDBOgG1cdfvWgeCKIKGyMLjp1oSfTbe4Qt5anPQkUAcU5e3DEgE8c1nr64mN2ysoKg9exrTxaagOzJ2jkfFUXWjCVlBxj7UGT1vSrfXbW1ilLRS28m+NwffGQfjisXrVpLZy3MEVzJAQScNgFj7e1dgHhzdj+JjHxSD8RfCGnjwpqOryNIlzbxhhsb0u3QEg/Bqlm18c9eOQrdqGXevLKBkfFOY1SO2EmPUxBjx7d6yRJlmWCMlmB2rtGcmtFod/aJeD6qdY44eAjHhjms88PHRx8vuj7Sv/FXOBjjnOM/2pfd6pJFqrWy28osgCA7IQWbuftQkurwW15PNBOYwxK5Veoz2o+21awv7IB5JGuAMtHsJY/PHas5hZ/jS5S36pe7ZEcq3oHT70PcX8pt8RepQeT0IHf8AtQ15qWnyIoDMH3gDg4B/7U7XwNrd/HG1gkMkJA81kuF3YPx9qmcdMuXGfDX8KY/P1TUL3KsIrbahB/KSf+QrW37PGH2dzgge1A+AfCV54ctr+S7CiW4IVUVs+kdzj9aZSW43EMSTnOa6MZqOPky7UntoZPqI8ZBJFbewj2BTWcW2XzlIU569a1GnIfKyasoMcekmqcbc5q5s7cVTzj5oF94ODStARKMZ603ul4NDRRru5HNAxtCdmKNGcUNbgBRRPFAsMETbSpXae2OlXRW0cp27s88mqbC0aZM8gZyaZw6ZscsjnmgshtI0XhunY1RNeCDKg5o0WTd3OKjJpsTrhlz80GfmnuLtmEaHPbmmlhE8UIVgTR1vZRwHKrg0UqjsKBIok84+jirJYpBhtuR35px5Sk5xXpiU8EUCyGQsBhfjrXHfxvuZ5vEVpapI5hhtgzw7iFYkk8gdf1ruYgRB6Vrh/wCKsX1HjuYZHEEYwfgGq5XUXwna6cmYtDkDKSdipxij9Et4pBvk/lb261frtgbdAzpgkZ57174eCtB5ePXv61ncv5b44az0a6jaxTWq7bfpnBx19qgNK2xhl3BsYyDinsdvutGXOCB1q54l2qR+tY97pv1x7MUujiS6eMAcDdzxgZrpn4Iwi01nVbQ4Imto5QM9CrEf/IVnNJtfP1eePGT5G4DHs2M/3rU+AQ1n4ziB486CWM/PQj/FXxz99Z8mE63TqE0CyDAAwPYUnubFUckKMU8f0DvQFyN/HcV0uIp+iAkDL1pvajam2qYo8HOaJUe1BdgGhpRhuOauOaqfI7UAVxyDQsfBA9zV90cc+9CJIBIPigZW+7Bokbu1UQOCB0oocjigXxpNbwqUYk4yQaOsLu5dysi7eOBVOkLJcoJZXQOy5wOcU5t1KSYdATjqKCKSSlgCOKIXd3FSkI4AUVGN17n96CwLXm3vXwcZABqLP68ZA+9B6HI7VYpzzUGJJ9GP0qS880EjzXDPHEXnePL89cMq/wDtrulcM8QuJvG2ql+AJzhhznAArPk/LXh/RF4j02WfSp7hyh8mPAx/msv4ficjaoy4f1D2rb+JJjHo9xDb4LSIVwPc0m8K6VEqXQuJyZI5AOMY5GTmsZf4dO/7NoIm8h0kDA96+mDFQF9u9XR6TglkmkPsAe1S/wBHdyNzTY+1Yr3KbKdAnx4oSFx/5lvLH+uVI/xWusZEtfFekSEhc3KqT7huP96xF3E2l+IbOZC7KPzEj8pPHPtmir/Wv/H2Uoz/AAbmOQH7MCf8VrJ7GWV+v0K0Yyc8gUBcrF6iWxR7uSm5SMHkGld4uc7jiutxg/OjD4VqOtSGXNKNqCXjNM7Yhk44oCG61VJjnPSpE+nPeqZZVKkUAlwVOfilqp5kuQcCibyTBBHQ0IWXzgN20UDC3fA60akh29qXQBQoAB+/vRO0H3oKreaa0hjnms7j19guSvxijYtbeecCOMqjcDcMEH7VlNC8V65dema6ifd+Usir/cVrNMvrJ28yWSNpCPzg9TQNoJGkflj0+aIEKN+ZR+1eRTQsuUK/rVgdT/Mn6Gg9WMAe9fbB7CvQR2I/evc4oI7Tng4rw7gcdai0wDYwxPsBUkfdyFI+DQehvevzz44fVNJ8aXXn2T4nkMsIHqEiHvX6Ixmk2saDb6pfafeyemezZ9px+ZGGGU/2OexFRZtOOWn56m1JXzNdWd15EEivcFV/KD+UZ6ckUktPEhs725njtmKzSF9jHpmu0/i7pkGmfh7qJhyDJNDyR2DcDP71+fYAGJJ9qpcJI1mdta1fH8qLxpcZx3Mx/wCVXy+OL8oDHpsSZHBMrGsZKF8l8da0dyIhbrnqFFUyxxk+NMJu+tJbeHtY8V+FG1uDM0nnNH9HFkZKn0sSTyASaqsfAfi2+EEEmnC0hmO15pm4jGOSR1rqP4LBY/AUJbobiYj/ANZrYTX0MOS56VrMZphcrLYHhi+nsbeB5CzRRKhb3IGM0uvZQPTnI+atm8R6YobzDLtH8wQkfvS86/pV0rmB2JHGGXFSormnjjIPIyOCBxmjLWQ7F9Qwe9JxeW88m03AXaehxxR1tcRMjKn9VSGbNsUE9DQMzBdxz196ncSbYww/N3pfLKzRnnB7feg+u2GwEngdMdqEiKSNJuOT2Iqh7wR/xHy3JGB8UEt2v1CmCZxGxLOrDkZoNRYqPLxwMe/ejQFA/wCtIrVzhG5wV4A6mjFlLDPmY+MUHONG0ySyMUtxqMUKBgsaNHkscdh2/WtlBqmlx27RPqEsIHAWKDbtb2J71n9Eihm8uJZIAAxUNJn1Y+9baDw7bXEMXmQ2RjwSyknBagzl1ffWSMun65rUsoBULHY7x+uOnWlRl8qUG41vUVLOAGkt/LGcflOf9q6XY6PFZqxgSyh3nlYpGUH+9DX+mwzOWDRrIvO9IxKV/cHmgzekajZ2ciyyazNJcTcKizMzHjoFC8/emUfiLURcFbexvZzjnJYAHvnKCiG8KG6tlP8AqcrqBujIto0VPnBWlup+H7uBfJTxpOtwq7tm3jb7kL0oNDaawQd2pQR2L4wWmkYD9yoB/emA1/SkOH1GyLH+m4XJ/vXOrSzjaYC61iw1zeT/AAJLwJGvzyc7v0phb+HtOsxubwpJNGxyPp7pZgv6dcUG9tNXtLuUxQOxIGclfSfselX3IufLb6Vod5/KJc4/XFY5otNwk40t7FnbBLbQePuRTSyu4JMJCkcjoThmuRlvnAJoEn4h+Hte8Q+GJ7SbU9Mt1DCRgyMqEDoC5PHPfFfnW4sJdOuZobqS3V4wOI5lcMO20rkGu2fjVPdxeDwm7bBcXSbkDbs45xmuGTXLSJGhAVYV2ptXGB3J9zRMulbuhYYcjnrtow3sboFMpBHfBoTzpCuxipU+618pCOSAc44IFRpMysdw/DDxDLYeGrGxbTJprQs7NLHneoLE79vOV57c0Z4o1C3llaGzvI5xvy7JuZox7EDkZ/xV34a6vaW/gDSkvfqV2q4LpwuN5/2pzPeeHnDNBBC+/Bkd2k3H2yVB/wA1KrJwa0lhZxR3Not9uJO9S6hF754PSgNO1S+v5jLb23kK5x5axOTtx1HFb2GcCMsLCKNAQFV5JWOf+EjOP0pTqk1xJdRzIXh9WHCOQAe3FAlKNFgSGQu55GzBBPfnpT6zuCm1Zsrj7e1DeI1jLqLnWFDkKy+bEeTjpx1r6xmjlh2RzQOsZxKRGQv9+tA+eVWizjI7bu9K5pkk2KBtI69gTTDbIqgTiMjHHGPTjilc1l5lw2EJwcgl8ZxQLL+Tyl3+U8iseSh/xSm1ZVuB5Cuu4DLF8bhR2txKiL5iy72UFP43z7Uogsrtp1MRRNvVRyevNBsLG4nUMVKkE5U8dPbNHbp8AqCAR2alFjbOAgeUlu+7KmmhRumVGOxbpQf/2Q=="
            />
          </Tooltip>
          <Tooltip title="dokyanh220">
            <Avatar
              alt=""
              src="https://i.pinimg.com/736x/a4/81/63/a481639243e8b1cc2579be1e480f2dec.jpg"
            />
          </Tooltip>
          <Tooltip title="dokyanh220">
            <Avatar
              alt=""
              src="https://i.pinimg.com/736x/09/0b/bc/090bbcffd9c72bc9dbcc34506b7cdcc4.jpg"
            />
          </Tooltip>
          <Tooltip title="dokyanh220">
            <Avatar
              alt=""
              src="https://i.pinimg.com/1200x/5c/fb/1c/5cfb1cb37eb2cd7d41fd7d92eace2177.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
