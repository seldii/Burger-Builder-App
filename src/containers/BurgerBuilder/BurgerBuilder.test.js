import { BurgerBuilder } from "./BurgerBuilder";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

//Configure enztme and connect it to the version of the react in use
configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
  });
  it("should <BuildControls /> when receiving ingredients ", () => {
    wrapper.setProps({ ingredients: null });
    expect(wrapper.find(BurgerControls)).toHaveLength(0);
  });
});
