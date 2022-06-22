import { Component, OnInit } from '@angular/core';
import { I18nService,L10nService, VIPService, LocaleService } from '@vmw/ngx-vip';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public options: any;
    public languages: any[] | undefined;
    public regions: any;
    public selectedLanguage: string | undefined;
    public selectedRegion: string | undefined;
    showDrawer: boolean | undefined;
    subscription: any;
    translation: any;
    demo: any;
    public initDate = {
        weekDayFormat:['S','M','T','W','T','F','S'],
        monthStrList:[
          {short:'Jan',long: 'January'},
          {short:'Feb',long: 'February'},
          {short:'Mar',long: 'March'},
          {short:'Apr',long: 'April'},
          {short:'May',long: 'May'},
          {short:'Jun',long: 'June'},
          {short:'Jul',long: 'July'},
          {short:'Aug',long: 'August'},
          {short:'Sep',long: 'September'},
          {short:'Oct',long: 'October'},
          {short:'Nov',long: 'November'},
          {short:'Dec',long: 'December'}
        ],
        selectedFormat: "dd/mm/yyyy"
      }
    constructor(private i18nService: I18nService, private l10nService: L10nService, private vipService: VIPService, private localeService: LocaleService) {}

  ngOnInit() {
    // this.subscription = this.l10nService.stream.subscribe((locale: string) => {
    //     this.translation = this.l10nService.getMessage('l10n', locale);
    //     console.log(this.translation)
    // });
    this.selectedLanguage = this.localeService.getCurrentLanguage();
    // this.selectedRegion = this.localeService.getCurrentRegion();

    this.getLanguages();
    this.getRegions(this.selectedLanguage);
    this.options = {
        languages: this.languages,
        regions: this.regions
    };
    
  }
  ngAfterViewInit() {
    this.localeService.setCurrentRegion('fr');
    this.selectedRegion = this.localeService.getCurrentRegion();
  }
  switchDrawer() {
      this.showDrawer = !this.showDrawer;
  }
  hideDrawer() {
      this.showDrawer = !this.showDrawer;
  }
  setLanguage(event: any) {
      let lang = event.target.value;
      this.localeService.setCurrentLanguage(lang);
      this.selectedLanguage = this.localeService.getCurrentLanguage();
      this.getRegions( this.selectedLanguage );
  }
  setRegion(event: any) {
      let newRegion = event.target.value;
      this.localeService.setCurrentRegion(newRegion);
      this.selectedRegion = this.localeService.getCurrentRegion();
  }
  getLanguages() {
      this.i18nService.getSupportedLanguages().then(
          (languages: any) => {
              this.languages = languages;
          }
      );
  }

  getRegions(language: string) {
      this.i18nService.getSupportedRegions(language).then(
          (res: any) => {
              if (res) {
                  this.regions = res;
              }
          }
      );
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
      this.subscription = undefined;
  }
  
  getDate(e: any){
    console.log(e);
  }

}
