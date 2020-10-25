import axios from 'axios';
const url = 'http://localhost:3000/api/';

export default {


    getUserReservations() {
      return axios.get(url + 'user/userReservations')
             .then(response => response.data);
    },

    getVacantRooms(nonFormatSelectedDate, selectedStart, selectedSlutt) {
            return axios.get(url + "user/vacantRooms/?date=" + nonFormatSelectedDate + "&start=" + selectedStart + "&slutt=" + selectedSlutt)
                .then(response => response.data);
    },

    reserveRoom(resInfo) {
            return axios.post(url + "user/reserveRoom", resInfo)
                .then(response => response.data);
    },

    /* cancelReservation(RID, SID) {
            return axios.delete(url + 'user/cancelReservation/?RID=' + RID + "&SID=" + SID)
                .then(response => response.data);
    }, */
    cancelReservation(RID) {
            return axios.delete(url + 'user/cancelReservation/?RID=' + RID)
                .then(response => response.data);
    },

    /* updateReservation(RID, nyStartTid, nySluttTid, roomId, SID) {
           return axios.post(url + 'user/updateReservation/?RID=' + RID + '&nyStartTid=' + nyStartTid + "&nySluttTid=" + nySluttTid + "&roomId=" + roomId + "&SID=" + SID)
               .then(response => response.data);
    },*/

    updateReservation(RID, nyStartTid, nySluttTid, roomId) {
               return axios.post(url + 'user/updateReservation/?RID=' + RID + '&nyStartTid=' + nyStartTid + "&nySluttTid=" + nySluttTid + "&roomId=" + roomId)
                   .then(response => response.data);
       },

    // Sjekk for lovlig redigering av reservasjoner
    checkGroupLeaderGroups(email, GID) {
        return axios.get(url + 'user/getGroupLeaderGroups/?RID=' + GID + '&email=' + email)
                .then(response => response.data);
    },
    // Henter alle gruppene til gruppeleder
    groupLeaderGroupsAll(email) {
        return axios.get(url + 'user/groupLeaderGroups/?email=' + email)
                .then(response => response.data);
    },


};

