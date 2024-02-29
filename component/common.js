import * as ImageType from "./cards/ImageType";
const scrollToError = () => {
  setTimeout(() => {
    const errorElement = document.querySelector('.border-danger');
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 500)
}

const ImageTypePhysicalNamees = (name) =>
  name === ImageType.HTML_OR_IMAGE ? 'HTML 5 or image' :
  name === ImageType.AUDIO ? 'Audio' :
  name === ImageType.VIDEO ? 'Video' :
  name === ImageType.THIRD_PARTY_AUDIO ? 'Third party audio' :
  name === ImageType.THIRD_PARTY_DISPLAY ? 'Third party display' :
  name === ImageType.THIRD_PARTY_VIDEO ? 'Third party video' :
  name === ImageType.NATIVE_SITE ? 'Native Site' :
  'Native Video';

  const diffCurrentTimeAndExpiryTime = (
    timeOne,
    timeTwo,
    type = "timestamp"
  ) => {
    if (type === "timestamp") {
      var difference = timeTwo - timeOne;
      var minutesDifference = Math.floor(difference / 1000 / 60);
      difference -= minutesDifference * 1000 * 60;
      return minutesDifference;
    }
  };

export {
  scrollToError,
  ImageTypePhysicalNamees,
  diffCurrentTimeAndExpiryTime
};