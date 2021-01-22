import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { Icon } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
 
const HealthCheckEntryElement: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    const getHealthColorFromRating = (rating: HealthCheckRating): SemanticCOLORS => {
        switch (rating) {
            case HealthCheckRating.Healthy:
                return "green";
            case HealthCheckRating.LowRisk: 
                return "olive";
            case HealthCheckRating.HighRisk: 
                return "yellow";
            case HealthCheckRating.CriticalRisk:
                return "orange";
            default:
                return "black";
        }
    };
    const healthColor = getHealthColorFromRating(entry.healthCheckRating);

    return <Icon name="heart" color={healthColor} />;
};

export default HealthCheckEntryElement;