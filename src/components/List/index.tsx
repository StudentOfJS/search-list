import * as React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Data, DataInterface } from '../../types';

const Item = posed.li();

const List: React.FC<DataInterface> = ({ data }) => {
  return (
    <ul>
      <PoseGroup>
        {data &&
          data.map((d: Data) => (
            <Item key={`${d.ProjectTitle}`}>
              <h3>{d.ProjectTitle}</h3>
              <h4>{d.Location}</h4>
              <p>{d.ShortDescription}</p>
            </Item>
          ))}
      </PoseGroup>
    </ul>
  );
};

export default List;
