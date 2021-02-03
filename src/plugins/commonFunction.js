export default {
  FindComponent(CNumber, course) {
    //Takes a component number and searches for it returns it
    let returnvalue;
    course.sections.forEach(section => {
      if (CNumber >= section.start && CNumber <= section.end) {
        returnvalue = section.components[CNumber - section.start];
      }
    });
    return returnvalue;
  }
};
