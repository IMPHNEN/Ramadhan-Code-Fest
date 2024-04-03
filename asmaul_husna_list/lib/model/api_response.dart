class EntityModel {
  int? urutan;
  String? latin;
  String? arab;
  String? arti;

  EntityModel({this.urutan, this.latin, this.arab, this.arti});

  factory EntityModel.fromJson(dynamic json) {
    return EntityModel(
        urutan: json['urutan'],
        latin: json['latin'],
        arab: json['arab'],
        arti: json['arti']);
  }
}
