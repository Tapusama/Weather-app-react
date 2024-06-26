export const findDay = (date) => {
  let d = date ? new Date(date).getDay() : new Date().getDay();
  switch (d) {
    case 1:
      return "MONDAY";
      break;
    case 2:
      return "TUESDAY";
      break;
    case 3:
      return "WEDNESDAY";
      break;
    case 4:
      return "THURSDAY";
      break;
    case 5:
      return "FRIDAY";
      break;
    case 6:
      return "SATURDAY";
      break;
    case 0:
      return "SUNDAY";
      break;
  }
};

export const findDayForCards = (date) => {
    let d =  new Date(date).getDay() 
    switch (d) {
      case 1:
        return "MON";
        break;
      case 2:
        return "TUE";
        break;
      case 3:
        return "WED";
        break;
      case 4:
        return "THU";
        break;
      case 5:
        return "FRI";
        break;
      case 6:
        return "SAT";
        break;
      case 0:
        return "SUN";
        break;
    }
  };
