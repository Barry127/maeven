import { render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';
import React, { createRef } from 'react';
import { ControlButton } from './ControlButton';

describe('ControlButton', () => {
  it('renders mvn--button element with given text', () => {
    render(<ControlButton icon={activity} />);
    const element = document.querySelector('.mvn--control-button');
    expect(element?.tagName).toBe('BUTTON');
    expect(element).toHaveClass('mvn--button');
  });

  it('sets className', () => {
    render(<ControlButton icon={activity} className="control-button-class" />);
    const element = document.querySelector('.mvn--control-button');
    expect(element).toHaveClass('control-button-class');
  });

  it('passes props', () => {
    render(
      <ControlButton
        icon={activity}
        id="ControlButtonId"
        data-test="control-button-data"
      />
    );
    const element = document.querySelector('.mvn--control-button');
    expect(element).toHaveAttribute('id', 'ControlButtonId');
    expect(element).toHaveAttribute('data-test', 'control-button-data');
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<ControlButton icon={activity} ref={ref} />);
      const element = document.querySelector('.mvn--control-button');
      expect(ref.current).toBe(element);
    });
  });
});
