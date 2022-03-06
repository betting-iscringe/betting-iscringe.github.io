import { Checkbox, Menu } from "antd";

export default (props) => {
  const { eventVisible, setEventVisible, events } = props;
  const handleChange = (value) => (e) => {
    const eventVisibility = { ...eventVisible };
    eventVisibility[value] = e.target.checked;
    setEventVisible(eventVisibility);
  };

  return (
    <Menu>
      {events.map((event) => (
        <Menu.Item key={event}>
          <Checkbox
            onChange={handleChange(event)}
            key={event}
            checked={eventVisible[event]}
          >
            {event}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );
};
