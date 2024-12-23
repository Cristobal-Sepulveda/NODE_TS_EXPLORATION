var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import firebaseAdmin from '../config/firebaseConfiguration.js';
const firestoreGCP = firebaseAdmin.firestore();
export class LocationRecordModel {
    getAllInDate(date, csvRows) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const collectionName = 'Users';
            const snapshot = yield firestoreGCP.collection(collectionName).get();
            for (const doc of snapshot.docs) {
                const subcollections = yield doc.ref.listCollections();
                if (subcollections.length === 0)
                    continue;
                const userLocationRegistry = subcollections[0];
                const userLocationData = yield userLocationRegistry.get();
                for (const subDoc of userLocationData.docs) {
                    const subDocId = subDoc.id;
                    const [, month, year] = subDocId.split('-');
                    const subDocDate = `${month}/${year}`;
                    const formattedDate = date.replace('-', '/');
                    if (subDocDate !== formattedDate)
                        continue;
                    const subDocData = subDoc.data();
                    const { hoursOfRegistry, internetStatusOnline, geoPoints } = subDocData;
                    for (let i = 0; i < hoursOfRegistry.length; i++) {
                        const row = [
                            subDoc.id,
                            (_a = subDocData.leader) === null || _a === void 0 ? void 0 : _a.name,
                            (_b = subDocData.team) === null || _b === void 0 ? void 0 : _b.team,
                            geoPoints[i]._latitude,
                            geoPoints[i]._longitude,
                            hoursOfRegistry[i],
                            internetStatusOnline[i] === true ? 'Online' : 'Offline'
                        ];
                        csvRows.push(row);
                    }
                }
            }
            return csvRows;
        });
    }
}
