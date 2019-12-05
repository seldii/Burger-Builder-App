import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

//Configure enztme and connect it to the version of the react in use
configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
  it("should render two <NavigationItem /> if not authenticated", () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
